// Примесь для чартов - генерирует рандомный цвет для датасета - чтобы каждый раз был новый цвет

export default {
    methods: {
        groupBy(arr, property) {
            return arr.reduce(function(memo, x) {
                if (!memo[x[property]]) {
                    memo[x[property]] = [];
                }
                memo[x[property]].push(x);

                return memo;
            }, {});
        },
        getNewChartColor() {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);

            return 'rgb(' + r + ',' + g + ',' + b + ', 0.5)';
        },
    },

};

