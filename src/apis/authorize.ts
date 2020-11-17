import axios from "axios"
import { host } from "../config/config"

export const authenticateGithubToken = (code:string|null) =>{
    return axios.post(`${host}/authorize/github`, {
        code: code
    },{
        headers : {
            'Content-Type' : 'application/json; charset=UTF-8'
        }
    });
}

export const checkAuth = () =>{
    return axios.get(`${host}/authorize`);
}
