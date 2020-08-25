<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.chartdata, this.options)
  }
}
</script>

<style lang="scss" scoped></style>