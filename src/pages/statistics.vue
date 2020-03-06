<template>
  <div class="statistics">
    <div class="statistics-content">
      <page-header title="통계"/>
      <div class="inline-block">
        <card class="counter">
          <h3>총 접속</h3>
          <h2>{{totalCnt}} 회</h2>
        </card>
        <card class="counter">
          <h3>일평균 접속</h3>
          <h2>{{avgCount}} 회</h2>
        </card>
      </div>
      <chart-viewer
        :labels="labels"
        :datasetArray="datasetArray"
        @change-statistics-type="changeStatisticsType"
        :selectedStatistics="selectedStatistics"
        :currentPoint="showingPoint"
        @change-current-point="changeCurrentPoint"
      />
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import pageHeader from '../components/PageHeader.vue';
  import {getYearlyStatistics, getMonthlyStatistics, getdailyStatistics, getConnectionCount} from '../lib/statistics';
  import LineChart from '../components/LineChart.vue';
  import Card from '../components/inheart-ui/card';
  import ChartViewer from '../components/ChartViewer';

  export default {
    name: 'statistics',
    components: {
      Card,
      pageHeader,
      LineChart,
      ChartViewer
    },
    data() {
      return {
        dataset: {
          label: '사용량',
          backgroundColor: 'rgba(231,76,60, 0.3)',
        },
        datasetArray: [],
        labels: [],
        totalCnt: 0,
        avgCount: 0,
        currentPoint: moment(),
        showingPoint: moment().format('YYYY'),
        selectedStatistics: 0,
      };
    },
    watch: {
      selectedStatistics() {
        this.updateSwitcher(this.selectedStatistics);
      }
    },
    methods: {
      changeStatisticsType(index) {
        this.selectedStatistics = index;
      },
      getDailyLabel(index) {
        if (index >= 9) return `${index}시`
        else return `0${index}시`
      },
      getMonthlyLabel(index) {
        if (index >= 9) return `${index + 1}일`
        else return `0${index + 1}일`
      },
      getYearlyLabel(index) {
        if (index >= 9) return `${index + 1}월`
        else return `0${index + 1}월`
      },
      changeCurrentPoint(coefficient) {
        switch (this.selectedStatistics) {
          case 0:
            this.currentPoint = Object.assign(this.currentPoint.add(coefficient, 'y'));
            break;
          case 1:
            this.currentPoint = Object.assign(this.currentPoint.add(coefficient, 'M'));
            break;
          case 2:
            this.currentPoint = Object.assign(this.currentPoint.add(coefficient, 'd'));
            break;
          default:
            break;
        }
        this.updateSwitcher(this.selectedStatistics)
      },
      updateSwitcher(statisticsNum) {
        switch (statisticsNum) {
          case 0:
            this.showingPoint = this.currentPoint.format('YYYY');
            this.updateYearlyStatistics(this.showingPoint);
            return;
          case 1:
            this.showingPoint = this.currentPoint.format('YYYY-MM');
            this.updateMonthlyStatistics(this.showingPoint);
            return;
          case 2:
            this.showingPoint = this.currentPoint.format('YYYY-MM-DD');
            this.updateDailyStatistics(this.showingPoint);
            return;
          default:
            return;
        }
      },
      async updateDailyStatistics(date) {
        const response = await getdailyStatistics(date);
        const {data} = response.data;
        this.labels = data.map((val, i) => this.getDailyLabel(i));
        this.datasetArray = data
      },
      async updateMonthlyStatistics(date) {
        const response = await getMonthlyStatistics(date);
        const {data} = response.data;
        this.labels = data.map((val, i) => this.getMonthlyLabel(i));
        this.datasetArray = data;
      },
      async updateYearlyStatistics(date) {
        const response = await getYearlyStatistics(date);
        const {data} = response.data;
        this.labels = data.map(((val, i) => this.getYearlyLabel(i)));
        this.datasetArray = data;
      },
      async updateConnectCount() {
        const response = await getConnectionCount();
        const {data} = response;
        this.totalCnt = data.data.totalCnt;
        this.avgCount = data.data.avgCount;
      }
    },
    mounted() {
      console.dir(moment().add(1, 'd'));
      this.updateSwitcher(this.selectedStatistics);
      this.updateConnectCount();
    },
  };
</script>

<style scoped>

  .inline-block {
    max-width: 640px;
    margin: 0 auto;
    display: flex;
  }

  .statistic-list .counter {
    margin: 20px 0;
  }

  .counter {
    flex-direction: column;
    height: 120px;
    width: calc(50% - 30px);
    margin: 20px;
    text-align: center;
  }

  .counter h3 {
    font-size: 1.5rem;
  }

  .counter h2 {
    margin-top: 10px;
    font-size: 2rem;
    font-weight: 100;
  }

  .statistics {
    height: 100vh;
    overflow: auto;
    padding-bottom: 50px;
  }
</style>
