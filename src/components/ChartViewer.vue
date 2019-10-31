<template>
  <card class="chart-viewer">
    <div class="chart-selector">
      <normal-button 
        v-for="(content, index) in buttons"
        :key="index"
        :content="content"
        :index="index"
        :is-selected="selectedStatistics === index"
        @change-selected-button="changeSelectedButton"
      />
    </div>
    <div class="chart-controller">
      <img src="../assets/ic_keyboard_arrow_left.svg" alt="arrow_left" @click="changeCurrentPoint(-1)">
      <p class="current-point">{{currentPoint}}</p>
      <img src="../assets/ic_keyboard_arrow_right.svg" alt="arrow_right" @click="changeCurrentPoint(1)">
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
    props: ['labels', 'datasetArray', 'selectedStatistics', 'currentPoint'],
    components: {
      Card,
      LineChart,
      NormalButton
    },
    data() {
      return {
        buttons: ['월 단위', '일 단위', '시간 단위'],
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              }
            }]
          }
        },
        dataset: {
          label: '사용량',
          backgroundColor: 'rgba(231,76,60, 0.3)',
        },
      };
    },
    methods: {
      changeSelectedButton(index) {
        this.$emit('change-statistics-type', index);
      },
      changeCurrentPoint(coefficient) {
        this.$emit('change-current-point', coefficient);
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

.chart-controller {
  display: flex;
  align-items: center;
}

.chart-controller > img{
  width: 50px;
  height: 50px;
  cursor: pointer;
}

.current-point {
  font-size: 1.5em;
  width: 6em;
  text-align: center;
}
</style>
