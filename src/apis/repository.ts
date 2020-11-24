import axios from "axios";
import { host } from "../config/config";

export const getRepository: any = (projectId: string) => {
  return axios.get(`${host}/repo/${projectId}`)
}

export const addRepo: any = (projectId: number, url: string) => {
  return axios.post(`${host}/repo`, { projectId, url });
}
