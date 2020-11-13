import axios from "axios"
import { host } from "../config/config"

export const getUser = () => {
    return axios.get(`${host}/api/user`)
}