import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Quasar from 'quasar';
import 'quasar/dist/quasar.sass';
import iconSet from 'quasar/icon-set/fontawesome-v5.js';

// Vue.config.productionTip = false;

// Vue.use(Quasar);

Vue.use(Quasar, {iconSet});

const initApp = () => {
    new Vue({
        router,
        store,
        render: (h) => h(App),
    }).$mount('#app');
};

store.dispatch('auth').then(() => {
    store.dispatch('getAnswersList');
}).finally(() => initApp());
