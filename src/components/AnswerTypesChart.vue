<script >
import {Pie} from 'vue-chartjs';
import {mapGetters} from 'vuex';
import mixinCharts from '@/mixins/mixinCharts';

export default {
    extends: Pie,
    name: 'AnswerTypesChart',
    mixins: [
        mixinCharts,
    ],
    computed: {
        ...mapGetters({
            filteredAnswers: 'filteredAnswers',
        }),
    },
    watch: {
        filteredAnswers() {
            this.update();
        },
    },
    data() {
        return {
            chartData: {
                datasets: [{
                    data: [10, 20, 30],

                }],

            },
            options: {
                responsive: true,
                maintainAspectRatio: false,

            },
        };
    },
    methods: {
        update() {
            const values = [];
            const labels = [];
            const backgroundColors = [];
            const answersTypes = this.groupBy(this.filteredAnswers, 'question_type');
            for (const [key, value] of Object.entries(answersTypes)) {
                labels.push(key);
                values.push(value.length);
                backgroundColors.push(this.getNewChartColor());
            }
            this.chartData.datasets[0].data = values;
            this.chartData.datasets[0].backgroundColor = backgroundColors;
            this.chartData.labels = labels;
            this.renderChart(this.chartData, this.options);
        },
    },
    mounted() {
        this.update();
    },

};
</script>

<style scoped>

</style>
