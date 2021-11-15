import Vue from 'vue';
import Vuex from 'vuex';
import {requests, apiConstants, addBearerTokenToAxios} from '@/api';
import {AxiosError, AxiosResponse} from 'axios';
import {IQuestionAnswer} from '@/interfaces';

Vue.use(Vuex);

export interface MainState {
    token: string | null,
    answers: Array<IQuestionAnswer> | null,
    filters: IQuestionAnswer | null
}


export default new Vuex.Store<MainState>({
    state: {
        token: null,
        answers: null,
        filters: null,
    },
    getters: {
        storedFilters(state) : IQuestionAnswer | null {
            return state.filters;
        },
        answers(state) : Array<IQuestionAnswer> | null {
            return state.answers;
        },
        filteredAnswers: (state) => {
            if (!state.answers) return [];

            const filterValues = Object.entries(state.filters || {}).filter((p) => null !== p[1] && '' !== p[1]);

            if (!state.filters || !filterValues) return state.answers;

            return state.answers.reduce((acc: Array<IQuestionAnswer>, p: IQuestionAnswer) => {
                let flag = true;
                for (const [key, value] of filterValues) {
                    if ('isValid' === key && p.isValid !== value) {
                        flag = false;
                    } else if (!(p as IQuestionAnswer)[key]?.includes(value)) flag = false;
                }
                if (flag) acc.push(p);

                return acc;
            }, []);
        },
    },
    mutations: {
        updateToken(state, payload) {
            state.token = payload;
            addBearerTokenToAxios(payload);
        },
        updateAnswers(state, payload) {
            state.answers = payload;
        },
        updateFilters(state, payload) {
            state.filters = payload;
        },
    },
    actions: {
        updateFilters({commit}, payload) {
            commit('updateFilters', payload);
        },
        checkToken({commit, dispatch}) {
            const token = localStorage.getItem('authToken');
            if (token) {
                commit('updateToken', token);
            } else {
                dispatch('auth');
            }
        },
        auth({commit}) {
            return requests.post(apiConstants.AUTH.LOGIN, {login: 'Txs6*y', password: '3@_RxR@c'})
                .then((response: AxiosResponse) => {
                    const token = response.data.message.token.token;
                    if (token) {
                        localStorage.setItem('authToken', token);
                        commit('updateToken', token);
                    }

                    return response;
                })
                .catch((error: AxiosError) => {
                    console.log(error.response?.data || 'Undefined error while login');

                    throw error;
                });
        },
        getAnswersList({commit}) {
            return requests.get(apiConstants.ANSWER.DEFAULT)
                .then((response: AxiosResponse) => {
                    commit('updateAnswers', response.data.message);

                    return response;
                })
                .catch((error: AxiosError) => {
                    console.log(error.response?.data || 'Undefined error while getting answers');

                    throw error;
                });
        },

    },
});
