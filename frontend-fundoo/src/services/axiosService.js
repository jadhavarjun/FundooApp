import axios from 'axios';

export default class AxiosServices {

    postMethod = (url, data, headers=false) => {
        console.log("aaaaaaaaaaaaaaa",url,data);
        return axios.post(url, data, {headers:{'token':`${headers.token}`}})
    }

    getMethod = (url, headers) => {
        console.log("aaaaaaaaaaaaaaa",headers.token);
        return axios.get(url, {headers:{'token':`${headers.token}`}})
    }
}
