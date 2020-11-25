import router from '@/router';
import axios from 'axios';
import { authenticateGithubToken } from '../../apis/authorize'

interface Auth {
    token: string | null
    oauthToken: string | null
}

const state: Auth = {
    token: null,
    oauthToken: null
};

const getters = {
    isAuthenticated: (state: Auth) => !!state.token,
    token: (state: Auth) => state.token,
    oauthToken: (state: Auth) => state.oauthToken,
};

const actions = {
    async login(context: any, githubCode: string) {
        authenticateGithubToken(githubCode).then((res) => {
            const token = res.data.token;
            const oauthToken = res.data.oauthToken;
            context.commit('setToken', token);
            context.commit('setOauthToken', oauthToken);
            axios.defaults.headers.common['Authorization'] = token;
            router.push('/project');
        }).catch((err) => {
            alert("系統發生錯誤！");
            router.push('/');
        });
    },
    logout(context: any) {
        context.commit('setToken', null);
        context.commit('setOauthToken', null);
        axios.defaults.headers.common['Authorization'] = null;
        router.push('/');
    }
};

const mutations = {
    setToken(state: Auth, token: string) {
        state.token = token
    },
    setOauthToken(state: Auth, oauthToken: string) {
        state.oauthToken = oauthToken
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};