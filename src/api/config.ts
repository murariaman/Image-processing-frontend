import axios from 'axios';

export const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://text-to-image-search.herokuapp.com/';

export const TEXT_TO_IMAGE = '/api/getTextImage';
export const DOWNLOAD_BACKGROUND = '/api/downloadImage';
export const REMOVE_BACKGROUND = '/api/removeBackgroundFile';
export const COMBINE_IMAGES = '/api/combineImages2';
export const COMBINE_SECOND_OBJECT = '/api/combineImages2Object';
export const GET_BG_SIZE = '/api/getBackgroundSize';
export const BWFILE = '/api/makeGrayScaleImage';
export const ADD_CIRCLE = '/api/addCircle';
export const ADD_RECTANGLE = '/api/addRectangle';

export default axios.create({
    baseURL: BASE_URL,
});