import axios from 'axios';

export default class AxiosServices {

    postMethod = (url, data) => {
        console.log("aaaaaaaaaaaaaaa",url,data);
        return axios.post(url, data)
    }
}
