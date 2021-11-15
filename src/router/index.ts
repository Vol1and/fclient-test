import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import AnswerList from '@/views/AnswerList.vue';
import ChartList from '@/views/ChartList.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'AnswerList',
        component: AnswerList,
    },
    {
        path: '/charts',
        name: 'ChartList',
        component: ChartList,
    },
];

const router = new VueRouter({
    routes,
});

export default router;
