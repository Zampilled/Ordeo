import {DELETE_CART_ITEM, GET_CART, UPDATE_CART, ADD_TO_CART} from '../actions/types.js';

const initialState = {
    carts : [],
    prod : []
}

export default function (state = initialState, action){
    switch (action.type){
        case GET_CART:
            return {
                ...state,
                carts: action.payload[0],
                prod : action.payload[0].products

            };
        case ADD_TO_CART:
            return{
                ...state,
                carts:[...state.carts, action.payload]
            };
        case UPDATE_CART:
            return{
                ...state,
                carts:[...state.carts, action.payload]
            };
        case DELETE_CART_ITEM:
            return {
                ...state,
                carts: state.carts.filter(cart => cart.id !== action.payload.id)
            }
        default:
            return state;
    }

}