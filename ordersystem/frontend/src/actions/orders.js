import axios from "axios";
import {createMessage, returnErrors} from "./messages";
import {tokenConfig} from "./auth";

import {GET_ORDERS, ORDER_RECEIVED, ORDER_SEND} from "./types";

//get order

export const getOrders = () => (dispatch, getState) => {
    axios.get('/api/orders',tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: GET_ORDERS,
                payload:res.data,
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const orderReceived = (id) => (dispatch, getState) => {
    axios.post('/api/orders/received',{id}, tokenConfig(getState))
        .then(res =>{
            dispatch({
                type: ORDER_RECEIVED,
                payload: {id}
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const getAdminOrders = () => (dispatch, getState) => {
    axios.get('/api/orders/admin',tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: GET_ORDERS,
                payload:res.data,
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const orderSend = (id) => (dispatch, getState) => {
    axios.post('/api/orders/admin/send',{id}, tokenConfig(getState))
        .then(res =>{
            dispatch({
                type: ORDER_SEND,
                payload: {id}
            })
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}