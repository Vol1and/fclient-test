<template>
  <div>
    <AnswerTypesChartContainer />
    <QuestionAnswersCountChartContainer />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import AnswerTypesChartContainer from '@/components/AnswerTypesChartContainer.vue';
import QuestionAnswersCountChartContainer from '@/components/QuestionAnswersCountChartContainer.vue';

@Component({
    components: {
        QuestionAnswersCountChartContainer,
        AnswerTypesChartContainer},
})
export default class ChartList extends Vue {
}
</script>

