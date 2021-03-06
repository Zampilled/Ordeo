import {DELETE_CART_ITEM, GET_CART, UPDATE_CART, ADD_TO_CART, CHECKOUT} from '../actions/types.js';

const initialState = {
    carts : [],
}

export default function (state = initialState, action){
    switch (action.type){
        case GET_CART:
            return {
                ...state,
                carts: action.payload,

            };
        case CHECKOUT:
            return {
                ...state,
                carts: []
            }
        case ADD_TO_CART:
            return{
                ...state,
                carts:[...state.carts, action.payload]
            };
        case UPDATE_CART:
            return{
                ...state,
                carts:[...state.carts],


            };
        case DELETE_CART_ITEM:
            return {
                ...state,
                carts: state.carts[0].products.filter(cart => cart.product !== action.payload.id)
            }
        default:
            return state;
    }

}