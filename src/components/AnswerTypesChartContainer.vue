<template>
  <div>
    <h3>Соотношение типов ответов</h3>
    <line-chart ref="chart"></line-chart>

  </div>
</template>

<script>
import LineChart from './AnswerTypesChart.vue';

export default {
    name: 'AnswerTypesChartContainer',
    components: {
        LineChart,
    },
};
</script>

<style scoped>

</style>
