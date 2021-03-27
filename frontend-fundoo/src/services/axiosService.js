import axios from 'axios';

export default class AxiosServices {

    postMethod = (url, data) => {
        return axios.post(url, data)
    }
}
