<template>
  <div>
    <h3>Количество ответов на вопросы</h3>
    <line-chart ref="chart"></line-chart>
  </div>
</template>

<script>
import LineChart from './QuestionAnswersCountChart.vue';

export default {
    name: 'QuestionAnswersCountChartContainer',
    components: {
        LineChart,
    },
};
</script>

<style scoped>

</style>
