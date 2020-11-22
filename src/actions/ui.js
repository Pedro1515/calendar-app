import { types } from '../types/types';



export const uiOpenModal = () => ({ type: types.uiOpenModal });
export const uiCloseModal = () => ({ type: types.uiCloseModal });

export const startLoading = () => ({type: types.uiStartLoading})
export const finishLoading = () => ({type: types.uiFinishLoading})