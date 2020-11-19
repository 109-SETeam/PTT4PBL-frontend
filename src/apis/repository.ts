import axios from "axios"
import { host } from "../config/config"

export const addRepo:any = async function (projectId:number,url:string):Promise<any> 
{
    return axios.post(`${host}/repo`,{projectId,url});//.then(res=>{return res});
}