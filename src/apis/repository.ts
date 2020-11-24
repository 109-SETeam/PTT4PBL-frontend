import axios from "axios";
import { host } from "../config/config";
import store from '@/store';

export const getRepository: any = (projectId: string) => {
  return axios.get(`${host}/repo/${projectId}`, {
    headers: {
      Authorization: `Bearer ${store.getters.token}`
    }
  })
}

export const addRepo: any = (projectId: number, url: string) => {
  return axios.post(`${host}/repo`, { projectId, url });
}
