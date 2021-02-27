import {getRequest} from './local_getRequest';
import {DOWNLOAD_BACKGROUND} from './config';

export const downloadBackground = async (URL: String, type: Number, dark ?:any) => {
    return await getRequest(DOWNLOAD_BACKGROUND + `?imageURL=${URL}&type=${type}&dark=${dark}`);
}