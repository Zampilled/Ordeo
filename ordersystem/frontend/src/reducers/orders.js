import {GET_ADMIN_ORDERS, GET_ORDERS, ORDER_RECEIVED, ORDER_SEND} from "../actions/types";

const initialState = {
    orders: [],
}

export default function (state = initialState, action){
    switch (action.type){
        case GET_ADMIN_ORDERS:
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        case ORDER_SEND:
        case ORDER_RECEIVED:
            return{
                ...state,
            }
        default:
            return state;
    }
}