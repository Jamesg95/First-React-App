import * as ActionsTypes from './ActionTypes';

export const Partners = (state={ isLoading: true, errMess: null, partners: []}, action) => {
    switch (action.type) {
        case ActionsTypes.ADD_PARTNERS:
            return {...state, isLoading: false, errMess: null, partners: action.payload}
        case ActionsTypes.PARTNERS_LOADING:
            return {...state, isLoading: true, errMess: null}
        case ActionsTypes.PARTNERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload}
        default:
            return state;
     }
}