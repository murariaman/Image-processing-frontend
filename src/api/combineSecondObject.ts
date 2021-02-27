import {getRequest} from './local_getRequest';
import {COMBINE_SECOND_OBJECT} from './config';

export const combineSecondObject = async(X: Number, Y: Number, type?: Number) => {
    return await getRequest(COMBINE_SECOND_OBJECT + `?X=${X}&Y=${Y}&T=${type}`);
}