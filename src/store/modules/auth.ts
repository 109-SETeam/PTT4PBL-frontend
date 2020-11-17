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
            context.commit('setToken', res.data);
            router.push('/');
        }).catch((err) => {
            console.log(err);
            alert("系統發生錯誤！")
        });
    }
};
const mutations = {
    setToken(state: Auth, token: string) {
        state.token = token
    },
    logOut(state: Auth) {
        state.token = null
    },
};
export default {
    state,
    getters,
    actions,
    mutations
};