<script>
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: ['labels', 'dataset', 'dataarray', 'options'],
  mounted() {
    this.renderLineChart();
  },
  data() {
    return {
      chartData: {},
    };
  },
  methods: {
    renderLineChart() {
      this.renderChart(
        {
          labels: this.labels,
          datasets: [{
            label: this.dataset.label,
            backgroundColor: this.dataset.backgroundColor,
            data: this.dataarray,
          }],
        },
        this.options,
      );
    },
  },
  watch: {
    dataarray: {
      handler() {
        this.$set(this, 'chartData', this.dataarray);
        this.renderLineChart();
      },
    },
  },
};
</script>

<style>
</style>
