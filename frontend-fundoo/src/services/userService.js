import AxiosServices from './axiosService'

// const { default: axios } = require('axios');
// const AxiosService = require('./axiosService')
let axiosService = new AxiosServices();

let baseUrl = "http://localhost:3000";

// let axiosService = new AxiosService();
export default class UserServices{
    registration = (data) =>{
        return axiosService.postMethod(`${baseUrl}/user/registration`,data)
    }
    forgotPassword = (data) =>{
        console.log("sssssssssssssssssssss");
        return axiosService.postMethod(`${baseUrl}/user/forgetpassword`,data)
    }
}
