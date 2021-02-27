import {getRequest} from './local_getRequest';
import {REMOVE_BACKGROUND} from './config';

export const removeBackground = async (fileName: String) => {
    return await getRequest(REMOVE_BACKGROUND + `?fileName=${fileName}`);
}