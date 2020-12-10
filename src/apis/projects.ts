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

export const getProject = (projectId: number | null) => {
    return axios.get(`${host}/project/${projectId}`, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${store.getters.token}`
        }
    }).then(response => {
        return response;
    });
}

export const deleteProject = (projectId: number, userId: string) => {
    return axios.delete(`${host}/project/${projectId}/${userId}`, {
        headers: {
            Authorization: `Bearer ${store.getters.token}`
        }
    })
}

export const addProject = (projectName: string | null) => {
    return axios.post(`${host}/project/add`, {
        ProjectName: projectName,
    }, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${store.getters.token}`
        }
    }).then(response => {
        return response;
    });
}


export const editProject = (projectId: number, projectName: string | (string | null)[], userId: string) => {
    return axios.post(`${host}/project/edit`, {
        ProjectId: projectId,
        ProjectName: projectName,
        UserId: userId
    },{
        headers:{
            'Content-Type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${store.getters.token}`
        }
    }).then(response => {
        return response;
    });
}