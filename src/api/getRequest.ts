import axios from './config';

export const getRequest = (endPoint: any, params=null) => {
    return axios.get(endPoint, {params});
};