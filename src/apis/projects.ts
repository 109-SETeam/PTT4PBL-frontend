import axios from "axios"
import { host } from "@/config/config"
import store from '@/store';

export const getProjects: any = () => {
    return axios.get(`${host}/project/`, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    }).then(function (response) {
        return response
    }).catch(err => {
        return false
    })
}

export const getProject = (ProjectId: number | null, UserId: string | null) => {
    return axios.post(`${host}/project/get`, {
        ProjectId: ProjectId,
        UserId: UserId
    }, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }).then(response => {
        return response;
    });
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
    });
}


export const editProject = (ProjectId: number, ProjectName: string | (string | null)[], UserId: string) => {
    return axios.post(`${host}/project/edit`, {
        ProjectId: ProjectId,
        ProjectName: ProjectName,
        UserId: UserId
    },{
        headers:{
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }).then(response => {
        return response;
    });
}