import React, {Fragment} from "react";
import Products from "./Products";
import Form from "./Form";

export default function Dashboard(){

    return(
        <Fragment>
            <Products />
            <Form/>
        </Fragment>
    )
}