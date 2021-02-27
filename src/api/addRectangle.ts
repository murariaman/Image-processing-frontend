import {getRequest} from './local_getRequest';
import {ADD_RECTANGLE} from './config';

export const addRectangle = async(X: Number, Y: Number, type?: Number) => {
    return await getRequest(ADD_RECTANGLE + `?X=${X}&Y=${Y}&T=${type}`);
}