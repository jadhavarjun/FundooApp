import axios from 'axios';

export default class AxiosServices {

    postMethod = (url, data, headers=false) => {
        return axios.post(url, data, {headers:{'token':`${headers.token}`}})
    }

    getMethod = (url, headers) => {
        return axios.get(url, {headers:{'token':`${headers.token}`}})
    }

    putMethod = (url, data, headers=false) => {
        return axios.put(url, data, {headers:{'token':`${headers.token}`}})
    }

    deleteMethod = (url, headers=false) => {
        return axios.delete(url, {headers:{'token':`${headers.token}`}})
    }
}
