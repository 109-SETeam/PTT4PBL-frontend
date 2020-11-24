import axios from "axios"
import { host } from "../config/config"

export const getProjects: any = () => {
    return axios.get(`${host}/project/${encryptUserId}`).then(function (response) {
        return response
    }).catch(err => {
        return err
    })
}

export const addProject = (ProjectName: string | null, UserId: string | null) => {
    return axios.post(`${host}/project`, {
        ProjectName: ProjectName,
        UserId: UserId
    }, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }).then(response => {
        return response;
    }).catch(err => {
        return false;
    });
}