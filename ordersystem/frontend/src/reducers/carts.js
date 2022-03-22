import {DELETE_CART_ITEM, GET_CART, UPDATE_CART, ADD_TO_CART, CHECKOUT} from '../actions/types.js';

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
                prod : action.payload[0].products,

            };
        case CHECKOUT:
            return {
                ...state,
                carts: null,
                prod: null
            }
        case ADD_TO_CART:
            return{
                ...state,
                carts:[...state.carts, action.payload]
            };
        case UPDATE_CART:
            return{
                ...state,
                carts:[...state.carts, action.payload],


            };
        case DELETE_CART_ITEM:
            return {
                ...state,
                prod: state.prod.filter(cart => cart.product !== action.payload.id)
            }
        default:
            return state;
    }

}