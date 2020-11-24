import axios from "axios"
import store from '@/store';
import { host } from "../config/config"

export const getUser = () => {
    return axios.get(`${host}/user`)
}

export const getUserInfo = ():Promise<any> => {
    return axios.get(`${host}/user`, {
        headers: {
            Authorization : `Bearer ${store.getters.token}`
        }
    })
}