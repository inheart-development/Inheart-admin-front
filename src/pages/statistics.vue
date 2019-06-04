<template>
  <div class="statistics">
    <navigation-drawer v-show="isDrawerOpened" @close-drawer="closeDrawer"/>
    <div class="statistics-content">
      <page-header title="통계" @open-drawer="openDrawer"/>
      <div class="statistics-container">
        <div class="statistics-viewer">
          <line-chart
            :labels="labels"
            :dataset="dataset"
            :dataarray="datasetArray"
            :options="options"
          />
        </div>
        <div class="total-count">총 접속횟수: {{totalData}}회</div>
      </div>
    </div>
  </div>
</template>

<script>
import navigationDrawer from '../components/NavigationDrawer.vue';
import pageHeader from '../components/PageHeader.vue';
import { getDailyConnect, getTotalConnect } from '../lib/statistics';
import LineChart from '../components/LineChart.vue';

export default {
  name: 'statistics',
  components: { navigationDrawer, pageHeader, LineChart },
  data() {
    return {
      isDrawerOpened: false,
      dataset: {
        label: '사용량',
        backgroundColor: 'rgba(231,76,60, 0.3)',
      },
      datasetArray: [],
      labels: [],
      totalData: '',
      options: { responsive: true, maintainAspectRatio: false },
    };
  },
  methods: {
    openDrawer() {
      this.isDrawerOpened = true;
    },
    closeDrawer() {
      this.isDrawerOpened = false;
    },
    async getDailyData() {
      const response = await getDailyConnect();
      const { data } = response.data;
      const days = data.map(val => val.day.substring(0, 10));
      const datasetData = data.map(val => val.count);
      this.labels = days;
      this.$set(this, 'datasetArray', datasetData);
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
.statistics {
  height: 100vh;
  background: linear-gradient(#a7c4cd, #b4a0bd);
}

.statistics-container {
  padding: 0 1em;
}

.statistics-viewer {
  height: auto;
  padding: 1em;
  box-sizing: border-box;
  background: #fff;
}

.total-count {
  background: #fff;
  text-align: center;
  height: 3em;
  line-height: 3em;
}
</style>
