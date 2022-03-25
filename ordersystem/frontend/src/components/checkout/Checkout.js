import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {checkout, getCart} from "../../actions/carts";
import {Link, Redirect} from "react-router-dom";

export class Checkout extends Component {

    static propTypes = {
        carts: PropTypes.array.isRequired,
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

        return (
            <div className="col-md-6 m-auto shadow">
                <div className="card card-body m-3">
                    <h2 className="text-center">Checkout</h2>
                    <h3 className=" m-auto fw-bold ">Total: ${Math.round(this.props.carts.total * 100) / 100}</h3>
                    <form className="text-center" onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label className="form-label pr-2">Payment Method</label>
                            <select className="select-list" onChange={e => this.onChange(e)} name="payment">
                                <option selected>....</option>
                                <option value="Cash">Cash</option>
                                <option value="Online Payment">Online Payment</option>
                                <option value="Visa">Visa</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Delivery Method</label>
                            <select onChange={e => this.onChange(e)} name="delivery" className="select-list">
                                <option selected>....</option>
                                <option value="Pick-up">Pick-up</option>
                                <option value="Normal Delivery">Normal Delivery</option>
                                <option value="Fast Delivery">Fast Delivery</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <Link to="/cart" className="btn btn-danger">Back</Link>
                            <button type="submit" className="btn btn-success">Checkout</button>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}

const mapStatetoProps = state => ({
    carts: state.carts.carts,
})

export default connect(mapStatetoProps,{checkout, getCart})(Checkout);