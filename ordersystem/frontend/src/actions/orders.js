import axios from "axios";
import {createMessage, returnErrors} from "./messages";
import {tokenConfig} from "./auth";

import {GET_ORDERS} from "./types";

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