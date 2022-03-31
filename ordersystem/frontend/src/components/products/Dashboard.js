import React, {Fragment} from "react";
import Products from "./Products";
import Form from "./Form";
import {Alerts} from "../layout/Alerts";

export default function Dashboard(){

    return(
        <Fragment>

            <Products />
            <Form/>
        </Fragment>
    )
}