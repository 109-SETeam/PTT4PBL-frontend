import axios from "axios"
import store from '@/store';
import { host } from "../config/config"

export const getUser = () => {
    return axios.get(`${host}/user`, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    })
}

export const getUserInfo = (): Promise<any> => {
    return axios.get(`${host}/user`, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    })
}

export const isCurrentUserProjectOwner: any = (projectId: string) => {
    return axios.get(`${host}/invitation/checkowner/${projectId}`, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    })
}