import AxiosServices from './axiosService'

// const { default: axios } = require('axios');
// const AxiosService = require('./axiosService')
let axiosService = new AxiosServices();

let baseUrl = "http://localhost:3000";

let headers = {'token':localStorage.getItem('token')}

// let axiosService = new AxiosService();
export default class UserServices{
    registration = (data) =>{
        return axiosService.postMethod(`${baseUrl}/user/registration`,data)
    }
    forgotPassword = (data) =>{
        return axiosService.postMethod(`${baseUrl}/user/forgetpassword`,data)
    }
    logIn = (data) =>{
        return axiosService.postMethod(`${baseUrl}/login`,data)
    }
    resetPassword = (data, token) =>{
        return axiosService.postMethod(`${baseUrl}/user/resetPassword/${token}`,data)
    }
    getAllNotes = () =>{
        return axiosService.getMethod(`${baseUrl}/note`, headers)
    }
    createNotes = (data) =>{
        return axiosService.postMethod(`${baseUrl}/note`, data, headers)
    }
    updateNote = (data, id) =>{
        return axiosService.putMethod(`${baseUrl}/note/${id}`, data, headers)
    }
    deleteNote = (id) =>{
        return axiosService.deleteMethod(`${baseUrl}/note/${id}`, headers)
    }
    trashNote = (id) =>{
        console.log("uuuuuuuuuuuuuuuussssssssss",id)
        return axiosService.putMethod(`${baseUrl}/note/${id}/trash_note`,{}, headers)
    }
    archiveNote = (id) =>{
        console.log("uuuuuuuuuuuuuuuussssssssss",id)
        return axiosService.putMethod(`${baseUrl}/note/${id}/archive_note`,{}, headers)
    }
}
