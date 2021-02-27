import axios from './config';
export const postRequest = (endPoint: any, params?: any) => {
  return axios.post(endPoint, params);
};