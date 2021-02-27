import {getRequest} from './local_getRequest';
import {ADD_CIRCLE} from './config';

export const addCircle = async(X: Number, Y: Number, type?: Number) => {
    return await getRequest(ADD_CIRCLE + `?X=${X}&Y=${Y}&T=${type}`);
}