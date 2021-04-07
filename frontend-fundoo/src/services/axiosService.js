import axios from 'axios';

export default class AxiosServices {

    postMethod = (url, data) => {
        console.log("aaaaaaaaaaaaaaa",url,data);
        return axios.post(url, data)
    }

    getMethod = (url, headers) => {
        console.log("aaaaaaaaaaaaaaa",headers.token);
        return axios.get(url, {headers:{'token':`${headers.token}`}})
    }
}
