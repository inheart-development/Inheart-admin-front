<template>
  <card class="chart-viewer">
    <div class="chart-selector">
      <normal-button 
        v-for="(content, index) in buttons"
        :key="index"
        :content="content"
        :index="index"
        :is-selected="selectedButton === index"
        @change-selected-button="changeSelectedButton"
      />
    </div>
    <div class="chart-wrapper">
      <line-chart
      :labels="labels"
      :dataset="dataset"
      :dataarray="datasetArray"
      :options="options"
    />
    </div>
  </card>
</template>

<script>
  import Card from './inheart-ui/card';
  import LineChart from './LineChart';
  import NormalButton from './NormalButton';

  export default {
    name: 'chart-viewer',
    props: [],
    components: {
      Card,
      LineChart,
      NormalButton
    },
    data() {
      return {
        buttons: ['연 단위', '월 단위', '일 단위'],
        selectedButton: 0,
        datasetArray: [],
        labels: [],
        options: {
          responsive: true,
          maintainAspectRatio: false
        },
        dataset: {
          label: '사용량',
          backgroundColor: 'rgba(231,76,60, 0.3)',
        },
      };
    },
    methods: {
      changeSelectedButton(index) {
        this.selectedButton = index;
      }
    },
  };
</script>

<style scoped>
.chart-viewer {
  height: auto;
  flex-direction: column;
}

.chart-wrapper {
  width: 100%;
}
</style>
