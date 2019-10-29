<template>
  <div class="statistics">
    <div class="statistics-content">
      <page-header title="통계"/>
      <div class="statistic-list">
        <card class="counter">
          <div class="inner-container">
            <h3>총 접속</h3>
            <h2>{{totalData}}회</h2>
          </div>
        </card>
        <card class="counter">
          <div class="inner-container">
            <h3>일평균 접속</h3>
            <h2>{{averageCount}}회</h2>
          </div>
        </card>
      </div>
      <card class="statistics-card">
        <div class="statistics-container">
          <div class="statistics-viewer">
            <line-chart
              :labels="labels"
              :dataset="dataset"
              :dataarray="datasetArray"
              :options="options"
            />
          </div>
          <!-- <div class="total-count">총 접속횟수: {{totalData}}회</div> -->
        </div>
      </card>
    </div>
  </div>
</template>

<script>
  import pageHeader from '../components/PageHeader.vue';
  import { getDailyConnect, getTotalConnect } from '../lib/statistics';
  import LineChart from '../components/LineChart.vue';
  import Card from '../components/inheart-ui/card';

  export default {
    name: 'statistics',
    components: {
      Card,
      pageHeader,
      LineChart
    },
    data() {
      return {
        dataset: {
          label: '사용량',
          backgroundColor: 'rgba(231,76,60, 0.3)',
        },
        datasetArray: [],
        labels: [],
        totalData: '',
        options: {
          responsive: true,
          maintainAspectRatio: false
        },
        totalDay: 1
      };
    },
    computed: {
      averageCount() {
        return Math.floor(this.totalData / this.totalDay);
      }
    },
    methods: {
      async getDailyData() {
        const response = await getDailyConnect();
        const { data } = response.data;
        const days = data.map(val => val.day.substring(0, 10));
        const datasetData = data.map(val => val.count);
        this.labels = days;
        this.$set(this, 'datasetArray', datasetData);
        this.totalDay = datasetData.length;
      },
      async getTotalData() {
        const response = await getTotalConnect();
        this.totalData = response.data.data.count;
      },
      async updataData() {
        this.getDailyData();
        this.getTotalData();
      },
    },
    created() {
      this.updataData();
    },
  };
</script>

<style scoped>
  .statistic-list {
    width: 600px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
  }

  .statistic-list .counter {
    margin: 20px 0;
  }

  .counter {
    height: 120px;
    width: 250px;
    margin: 20px;
    justify-content: flex-start;
  }

  .counter h3 {
    font-size: 1.5rem;
  }

  .counter h2 {
    margin-top: 10px;
    font-size: 2rem;
    font-weight: 100;
  }

  .statistics-card {
    height: auto;
  }

  .statistics {
    height: 100vh;
    overflow: auto;
    padding-bottom: 50px;
  }

  .statistics-container {
    position: relative;
    width: 100%;
    margin: 0;
  }

  .statistics-viewer {
    height: auto;
    padding: 1em;
    box-sizing: border-box;

  }
</style>
