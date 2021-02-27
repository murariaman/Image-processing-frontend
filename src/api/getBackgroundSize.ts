import {getRequest} from './local_getRequest';
import {GET_BG_SIZE} from './config';

export const getBackgroundSize = async () => {
    return await getRequest(GET_BG_SIZE);
}