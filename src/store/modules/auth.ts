import router from '@/router';
import axios from 'axios';
import { authenticateGithubToken } from '../../apis/authorize'

interface Auth {
    token: string | null
}

const state: Auth = {
    token: null,
};
const getters = {
    isAuthenticated: (state: Auth) => !!state.token,
    token: (state: Auth) => state.token
};
const actions = {
    async login(context: any, githubCode: string) {
        authenticateGithubToken(githubCode).then((res) => {
            const token = res.data;
            context.commit('setToken', token);
            axios.defaults.headers.common['Authorization'] = token;
            router.push('/');
        }).catch((err) => {
            console.log(err);
            alert("系統發生錯誤！");
            router.push('/');
        });
    },
    logout(context: any) {
        context.commit('setToken', null);
        axios.defaults.headers.common['Authorization'] = null;
        router.push('/');
    }
};
const mutations = {
    setToken(state: Auth, token: string) {
        state.token = token
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};