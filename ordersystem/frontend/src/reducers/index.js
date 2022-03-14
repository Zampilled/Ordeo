import {combineReducers} from "redux";
import products from './products';
import errors from './errors';
import messages from "./messages";
import auth from "./auth";
import carts from "./carts";

export default combineReducers({
    products,
    errors,
    messages,
    auth,
    carts,
});