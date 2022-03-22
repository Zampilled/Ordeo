import axios from "axios";
import {returnErrors} from "./messages";

import {
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    USER_LOADED,
    USER_LOADING,
    ADMIN_LOADED,
    ADMIN_LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "./types";

// LOAD USER AND CHECK TOKEN
export const loadUser = () => (dispatch, getState) =>{
    //USER LOADING
    dispatch({type: USER_LOADING});

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res =>{
            if(res.data.user.is_staff === true){
                dispatch({
                    type: ADMIN_LOADED,
                    payload: res.data
                })
            }
            else {
                dispatch({
                    type: USER_LOADED,
                    payload: res.data
                })
            }
        }).catch(err =>{
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
    });
}

// LOGIN USER
export const login = (username, password) => dispatch =>{
    //HEADERS
    const config = {
        headers:{
            "Content-Type": "application/json"
        }
    }

    // Request body
    const body = JSON.stringify({username, password});

    axios.post('/api/auth/login', body, config)
        .then(res =>{
            if(res.data.user.is_staff === true){

                dispatch({
                    type: ADMIN_LOGIN_SUCCESS,
                    payload: res.data
                })
            }
            else {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                })
            }
        }).catch(err =>{
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: LOGIN_FAIL
        });
    });
}

//Register User
export const register = ({username, password , email}) => dispatch =>{
    //HEADERS
    const config = {
        headers:{
            "Content-Type": "application/json"
        }
    }
    // Request body
    const body = JSON.stringify({username, password, email});
    axios.post('/api/auth/register', body, config)
        .then(res =>{
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        }).catch(err =>{
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: REGISTER_FAIL
        });
    });
}
//LOGOUT
export const logout = () => (dispatch, getState) =>{


    axios.post('/api/auth/logout/',null, tokenConfig(getState))
        .then(res =>{
            dispatch({
                type: LOGOUT_SUCCESS
            })
        }).catch(err =>{
        dispatch(returnErrors(err.response.data, err.response.status));
    });
}

//Setup config with token
export const tokenConfig = getState => {
    // GET TOKEN FROM STATE
    const token = getState().auth.token;
    //HEADERS
    const config = {
        headers:{
            "Content-Type": "application/json"
        }
    }
    //IF TOKEN, ADD TO HEADERS CONFIG
    if (token){
        config.headers["Authorization"] = `Token ${token}`;
    }

    return config;
}