import axios from "axios";
import {createMessage, returnErrors} from "./messages";
import {tokenConfig} from "./auth";

import {DELETE_CART_ITEM, GET_CART, UPDATE_CART, ADD_TO_CART, CHECKOUT} from "./types";

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

//Add to Cart

export const addToCart = (id, quantity) =>(dispatch, getState) =>{
    const body = JSON.stringify({id,quantity});
    axios.post('/api/cart/order',body, tokenConfig(getState))

        .then(res=>{
            dispatch(createMessage({productCreated: "Products Added"}));
            console.log(res)
            //dispatch(createMessage({productCreated: "Added to Cart"}));
            dispatch({
                type: ADD_TO_CART,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

}

// Update Cart

export const updateCart = (id, quantity) =>(dispatch, getState) =>{
    const body = JSON.stringify({id,quantity});
    axios.patch('/api/cart/order',body, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: UPDATE_CART


            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

}

//Delete Cart Item

export const deleteCartItem = (id) =>(dispatch, getState) =>{
    axios.put('/api/cart/order',{id},tokenConfig(getState) )
        .then(res=>{
            dispatch(createMessage({productCreated: "Products Deleted"}));
            dispatch({
                type: DELETE_CART_ITEM,
                payload: {id}

            });

        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

}

//Checkout

export const checkout = (payment, delivery) =>(dispatch, getState) =>{
    //const body = JSON.stringify({payment, delivery});

    axios.post('/api/cart/checkout',{payment, delivery}, tokenConfig(getState))
        .then(res=>{
            dispatch(createMessage({productCreated: "Checkout Complete"}));
            dispatch({
                type: CHECKOUT,
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

