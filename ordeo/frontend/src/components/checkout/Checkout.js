import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {checkout, getCart} from "../../actions/carts";
import {Link, Redirect} from "react-router-dom";

export class Checkout extends Component {

    static propTypes = {
        //carts: PropTypes.array.isRequired,
        checkout: PropTypes.func.isRequired,
        getCart: PropTypes.func.isRequired,
    }
    componentDidMount() {
        this.props.getCart();
    }
    state = {
        payment: '',
        delivery: ''
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state)
        }

    onSubmit = (e) => {
        e.preventDefault();
        const { payment, delivery } = this.state;

        console.log(payment, delivery)
        this.props.checkout(payment, delivery);
        this.setState({
            payment: '',
            quantity: ''
        });

    };

    render() {
        if(this.props.carts == null){
            return <Redirect to="/"/>
        }
        else {
            return (

                <div className="col-md-6  card m-auto shadow car border-success mt-2">
                    <div className=" card-body  m-3 text-center">
                        <h2 className="text-center">Checkout</h2>
                        <h3 className=" m-auto fw-bold text-centre">Total: ${Math.round(this.props.carts.map(total =>(total.total)) * 100) / 100}</h3>
                        <form className="text-center" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label className="form-label  m-2">Payment Method</label>
                                <select className="select-list m-2" onChange={e => this.onChange(e)} name="payment">
                                    <option selected>....</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Online Payment">Online Payment</option>
                                    <option value="Visa">Visa</option>
                                </select>
                            </div>
                            <div className="form-group ">
                                <label className="form-label m-2">Delivery Method</label>
                                <select onChange={e => this.onChange(e)} name="delivery" className="select-list m-2">
                                    <option selected>....</option>
                                    <option value="Pick-up">Pick-up</option>
                                    <option value="Normal Delivery">Normal Delivery</option>
                                    <option value="Fast Delivery">Fast Delivery</option>
                                </select>
                            </div>
                            <div className="form-group m-1">
                                <Link to="/cart" className="btn btn-danger btn-lg m-1">Back</Link>
                                <button type="button" className="btn btn-primary btn-lg m-1" data-bs-toggle="modal" data-bs-target="#exampleModal">Checkout</button>
                            </div>
                            <div className="modal fade" id="exampleModal" tabIndex="-1"
                                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content border-danger">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Checkout</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                                        </div>
                                        <div className="modal-body ">
                                            <h5 className="fw-bold">Are you sure you want to checkout?</h5>
                                            <h6 className="label">Delivery : {this.state.delivery}</h6>
                                            <h7 className="label">Payment : {this.state.payment}</h7>
                                        </div>
                                        <div className="modal-footer d-flex align-items-center justify-content-center">
                                            <button type="button" className="btn btn-secondary"
                                                    data-bs-dismiss="modal">Close
                                            </button>
                                            <button type="submit" className="btn btn-success fw-bold" data-bs-dismiss="modal">Checkout</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </form>

                    </div>
                </div>
            );
        }
    }
}

const mapStatetoProps = state => ({
    carts: state.carts.carts,
})

export default connect(mapStatetoProps,{checkout, getCart})(Checkout);