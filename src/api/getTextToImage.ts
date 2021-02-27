import {getRequest} from './local_getRequest';
import {TEXT_TO_IMAGE} from './config';

export const getTextToImage = async (text: String, limit: Number) => {
    return await getRequest(TEXT_TO_IMAGE + `?text='${text}'&limit=${limit}`);
}