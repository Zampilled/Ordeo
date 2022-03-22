import React, {Component} from 'react';
import {connect} from "react-redux";

import PropTypes from "prop-types";
import {deleteCartItem, getCart, updateCart} from "../../actions/carts";
import {Link, Redirect} from "react-router-dom";

export class Cart extends Component {
    static propTypes = {
        prod : PropTypes.array.isRequired,
        carts : PropTypes.array.isRequired,
        deleteCartItem: PropTypes.func.isRequired,
        getCart: PropTypes.func.isRequired,
        updateCart: PropTypes.func.isRequired,
    };
    componentDidMount() {
        this.props.getCart();
    }
    state = {
        TheCart: []
    }
    onChange (i, e) {
        let TheCart = JSON.parse(JSON.stringify(this.state.TheCart))
        let TheValues = [{id:"",quantity:""}]
        TheValues["id"]= i;
        TheValues["quantity"]= e.target.value;
        let index = TheCart.findIndex(obj => obj.id === i)
        if (index === -1){
            TheCart.push({"id":TheValues.id , "quantity":TheValues.quantity})
        }
        else {
            TheCart[index].quantity = e.target.value;
        }
        this.setState({TheCart})
        console.log(this.state.TheCart)

    }
    onSubmit(e) {
        console.log("submit")
        let TheCart = JSON.parse(JSON.stringify(this.state.TheCart))

        for(let i = 0; i<TheCart.length;i++ ){
            let id, quantity  = 0;
            id = TheCart[i].id;
            quantity = TheCart[i].quantity;
            this.props.updateCart(id,quantity);
        }
        this.componentDidMount()
        this.setState({
            TheCart: [],

        });
        this.componentDidMount()
    }

    render() {

        const {quantity} = this.state

        return (

            <div className="rounded shadow ">
                <table className="table table-sm table-hover tab align-middle ">
                    <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Sub-Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.prod.map(cart => (

                        <tr key={cart.id}>
                            <td><img src={cart.image} alt="" className="rounded"  height="60" width="auto"></img></td>
                            <td>{cart.name}</td>
                            <td>{cart.description}</td>
                            <td>${cart.price}</td>
                            <td className="col-sm-1">
                                <input
                                className="form-control"
                                name = "quantity"
                                type = "number"
                                placeholder={cart.quantity}
                                value={quantity}
                                onChange={e => this.onChange(cart.product,e)}
                                />
                            </td>
                            <td>${Math.round(cart.subtotal * 100) / 100}</td>


                            <td>
                                <button onClick={this.props.deleteCartItem.bind(this,cart.product)} className="btn btn-danger btn-sm">{' '}Delete</button>
                            </td>
                        </tr>

                    ))}

                    </tbody>

                </table>
                <div className="text-end align-middle m-auto">
                    <label className="label label-danger m-auto fa-bold ">Total: ${Math.round(this.props.carts.total * 100) / 100}</label>
                    <form onSubmit={e => this.onSubmit(e)}>
                        <div className="m-auto">
                            <button type="submit" className="btn btn-primary" >Quantity</button>
                        </div>
                    </form>

                        <div className="">
                            <Link to="/cart/checkout" className="btn btn-success " >Checkout</Link>
                        </div>
                </div>
            </div>


        );
    }
}

const mapStatetoProps = state => ({
    carts: state.carts.carts,
    prod : state.carts.prod
})


export default connect(mapStatetoProps, { getCart, deleteCartItem, updateCart})(Cart);