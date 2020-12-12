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

export const editUserName = (newUserName: string) => {
    return axios.post(`${host}/user/edit`,{
        Name: newUserName
    }, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${store.getters.token}`
        }
    }).then(response => {
        return response;
    });
}

export const isCurrentUserProjectOwner: any = (projectId: string) => {
    return axios.get(`${host}/invitation/checkowner/${projectId}`, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    })
}