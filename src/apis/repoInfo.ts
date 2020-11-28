import axios from "axios"
import { host } from "@/config/config"
import store from '@/store';

export const getCommitInfo = (repoId: number | null) => {
    return axios.get(`${host}/repoInfo/commit/${repoId}`);
}

export const getIssueInfo = (repoId: number | null) => {
    return axios.get(`${host}/repoInfo/issue/${repoId}`, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    });
}