import axios from "axios"
import { host } from "../config/config"

export const getProject: any = async function (encryptUserId: string): Promise<any> {
    return axios.get(`${host}/project/${encryptUserId}`).then(function (response) {
        return response
    }).catch(err => {
        return err
    })
}