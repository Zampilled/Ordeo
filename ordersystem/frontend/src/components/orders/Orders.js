import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getOrders , orderReceived} from "../../actions/orders";
import {Link, Redirect} from "react-router-dom";
import {Cart} from "../carts/Cart";


export class Orders extends Component {
    static propTypes = {
        orders : PropTypes.array.isRequired,
        getOrders : PropTypes.func.isRequired,
        orderReceived: PropTypes.func.isRequired,
    };
    componentDidMount() {
        this.props.getOrders()
    }
    state = {
        detailOrder : null
    }
    onClick(e){
        this.props.orderReceived(e)
        console.log(e)

    }
    openModal(e){
        this.setState({detailOrder:e })
        console.log(this.state.detailOrder)
    }

    render() {

        return (
            <div className="col-auto d-flex align-items-center flex-row justify-content-center">
            <div className="rounded shadow card card-body text-center border-primary mt-2">
                <table className="table table-sm table-hover tab align-middle ">
                    <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Details</th>
                    </tr>
                    </thead>
                    <tbody>

                    {this.props.orders.map((orders, i) => (
                        <tr key={orders.id}>
                            <td>{orders.id}</td>

                            <td className="fw-bold">${orders.total}</td>
                            <td>
                                <button className="btn btn-info"
                                        type="button"
                                        onClick={() => this.openModal(i)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal">{' '}Details</button>
                            </td>
                            <td>{orders.sent? orders.received? 'Order Received':<button
                                onClick={() => this.openModal(orders.id)}
                                className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#Order">
                                {' '}
                                Order Received?
                            </button>:'Order Not Sent Yet' }</td>



                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="modal fade" id="exampleModal" tabIndex="-1"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content border-info">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Order Details</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                            </div>
                            <div className="modal-body">
                                <div className='card rounded'>
                                <table className="table table-sm tab align-middle ">
                                    <thead>
                                    <th>Product ID</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    </thead>

                                    {this.props.orders.slice(this.state.detailOrder, this.state.detailOrder+1)
                                    .map(order => (<tbody key={order.id}>
                                            {order.products.map(product =>(
                                                <tr key={product.id}>
                                                        <td>{product.id}</td>
                                                        <td><img src={product.image} alt="" className="rounded"  height="60" width="auto"></img></td>
                                                        <td>{product.name}</td>
                                                        <td>{product.quantity}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    ))}
                                </table>
                                </div>
                                <div className="card text-center mt-2 ">
                                    {this.props.orders.slice(this.state.detailOrder, this.state.detailOrder+1)
                                        .map(order =>(
                                            <div key={order.id}>
                                                <h5>Delivery: {order.delivery}</h5>
                                                <h5>Payment: {order.payment}</h5>
                                                <h4 className="fw-bold">Total: ${order.total}</h4>
                                            </div>
                                            )
                                        )
                                    }

                                </div>

                            </div>
                            <div className="modal-footer d-flex align-items-center justify-content-center">
                                <button type="button" className="btn btn-secondary  "
                                        data-bs-dismiss="modal">Close
                                </button>
                            </div>
                            </div>


                    </div>
                </div>
                <div className="modal fade " id="Order" tabIndex="-1"
                     aria-labelledby="Order" aria-hidden="true">
                    <div className="modal-dialog ">
                        <div className="modal-content border-danger ">
                            <div className="modal-header ">
                                <h5 className="modal-title" id="Order">Conformation Box</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                            </div>
                            <div className="modal-body ">
                                <h4>Are You Sure?</h4>


                            </div>
                            <div className="modal-footer d-flex align-items-center justify-content-center">
                                <button type="button" className="btn btn-secondary   "
                                        data-bs-dismiss="modal">Close
                                </button>
                                <button type="button" className="btn btn-success fw-bold" data-bs-dismiss="modal" onClick={() => this.onClick(this.state.detailOrder)}>Confirm</button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            </div>

        );
    }
}
const mapStatetoProps = state => ({
    orders: state.orders.orders,

})

export default connect(mapStatetoProps, { getOrders , orderReceived})(Orders);