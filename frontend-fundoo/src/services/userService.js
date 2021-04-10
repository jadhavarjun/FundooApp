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
        console.log("sssssssssssssssssssss");
        return axiosService.postMethod(`${baseUrl}/user/resetPassword/${token}`,data)
    }
    getAllNotes = () =>{
        console.log("sssssssssssssssssssss");
        return axiosService.getMethod(`${baseUrl}/note`, headers)
    }
    createNotes = (data) =>{
        console.log("sssssssssssssssssssss");
        return axiosService.postMethod(`${baseUrl}/note`, data, headers)
    }
    updateNote = (data, id) =>{
        console.log("sssssssssssssssssssss");
        return axiosService.putMethod(`${baseUrl}/note/${id}`, data, headers)
    }
    deleteNote = (id) =>{
        console.log("sssssssssssssssssssss");
        return axiosService.deleteMethod(`${baseUrl}/note/${id}`, headers)
    }
}
