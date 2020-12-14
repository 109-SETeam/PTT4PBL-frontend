import axios from "axios";
import { host } from "../config/config";
import store from '@/store';

export const getRepository: any = (projectId: string) => {
  return axios.get(`${host}/repo/${projectId}`, {
    headers: {
      Authorization: `Bearer ${store.auth.getToken}`
    }
  })
}

export const addRepo: any = (projectId: number, url: string) => {
  return axios.post(`${host}/repo`, { projectId, url }, {
    headers: {
      Authorization: `Bearer ${store.auth.getToken}`
    }
  });
}

export const deleteRepo: any = (projectId: number, repoId: number) => {
  return axios.delete(`${host}/repo/?projectId=${projectId}&repoId=${repoId}`, {
    headers: {
      Authorization: `Bearer ${store.auth.getToken}`
    }
  });
}