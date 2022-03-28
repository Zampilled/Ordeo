import axios from "axios";
import {createMessage, returnErrors} from "./messages";
import {tokenConfig} from "./auth";

import {ADD_PRODUCT, DELETE_PRODUCT, GET_PRODUCTS,} from "./types";

// GET PRODUCTS

export const getProducts = () => (dispatch, getState) => {
    axios.get('/api/products/', tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE PRODUCTS

export const deleteProduct = (id) => (dispatch, getState) => {
    axios.delete(`/api/products/${id}/`, tokenConfig(getState))
        .then(res=>{
            dispatch(createMessage({productDeleted: "Product Deleted"}))
            dispatch({
                type: DELETE_PRODUCT,
                payload: id

            });
        }).catch(err => console.log(err));
}

// ADD PRODUCT

export const addProduct = (product) => (dispatch, getState) => {
    console.log(product)
    axios.post('/api/products/',product, tokenConfig(getState))
        .then(res=>{

            dispatch({
                type: ADD_PRODUCT,
                payload: res.data

            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

