import axios from "axios";
import {createMessage, returnErrors} from "./messages";
import {tokenConfig} from "./auth";

import {DELETE_CART_ITEM, GET_CART, UPDATE_CART} from "./types";

// GET CART

export const getCart = () =>(dispatch, getState) =>{
    axios.get('/api/cart', tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: GET_CART,
                payload: res.data

            });

        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

}

//Update Cart

export const updateCart = (id, quantity) =>(dispatch, getState) =>{
    const body = JSON.stringify({id,quantity});
    axios.post('/api/orderitem',body, tokenConfig(getState))

        .then(res=>{
            dispatch(createMessage({productCreated: "Products Added"}));
            console.log(res)
            //dispatch(createMessage({productCreated: "Added to Cart"}));
            dispatch({
                type: UPDATE_CART,
                payload: res.data

            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

}

//Delete Cart Item

export const deleteCartItem = (id) =>(dispatch, getState) =>{
    const body = JSON.stringify({id});
    axios.put('/api/orderitem',{id},tokenConfig(getState) )
        .then(res=>{
            console.log({id})
            dispatch(createMessage({productCreated: "Products Deleted"}));
            dispatch({

                type: DELETE_CART_ITEM,
                payload: {id}

            });

        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

}