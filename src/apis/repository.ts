import axios from "axios";
import { host } from "../config/config";

export const getRepository: any = async function (
  projectId: string
): Promise<any> {
  return axios
    .get(`${host}/repository/${projectId}`)
    .then(function (response) {
      return response;
    })
    .catch(err => {
      return err;
    });
};

export const addRepo: any = async function (projectId: number, url: string): Promise<any> {
  return axios.post(`${host}/repo`, { projectId, url });//.then(res=>{return res});
}
