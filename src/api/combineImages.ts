import {getRequest} from './local_getRequest';
import {COMBINE_IMAGES} from './config';

export const combineImages = async(X: Number, Y: Number, type?: Number) => {
    return await getRequest(COMBINE_IMAGES + `?X=${X}&Y=${Y}&T=${type}`);
}