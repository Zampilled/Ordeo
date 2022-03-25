import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getOrders} from "../../actions/orders";
import {Link, Redirect} from "react-router-dom";
import {Cart} from "../carts/Cart";

export class Orders extends Component {
    static propTypes = {
        orders : PropTypes.array.isRequired,
        getOrders : PropTypes.func.isRequired,
    };
    componentDidMount() {
        this.props.getOrders()
    }

    render() {
        return (
            <div className="rounded shadow">
                <table className="table table-sm table-hover tab align-middle">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Delivery</th>
                        <th>Payment</th>
                        <th>Product</th>
                        <th>Total</th>
                        <th>Sent</th>
                        <th>Received</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.orders.map(orders => (
                        <tr key={orders.id}>
                            <td>{orders.id}</td>
                            <td>{orders.delivery}</td>

                            <td>{orders.payment}</td>
                            <td>${orders.total}</td>
                            <td>{orders.sent}</td>
                            <td>{orders.received}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                
            </div>
        );
    }
}
const mapStatetoProps = state => ({
    orders: state.orders.orders
})

export default connect(mapStatetoProps, { getOrders})(Orders);