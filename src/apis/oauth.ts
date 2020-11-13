import axios from "axios"
import { host } from "../config/config"

export const authenticateGithubToken = (code:string|null) =>{
    return axios.post(`${host}/oauth/github`, {
        code: code
    });
}
