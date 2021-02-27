import {getRequest} from './local_getRequest';
import {BWFILE} from './config';

export const blackAndWhiteImage = async () => {
    const sleep = (milliseconds: Number) => {
        return new Promise(resolve => setTimeout(resolve, Number(milliseconds)))
    }
    await sleep(1000)
    return await getRequest(BWFILE);
}