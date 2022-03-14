import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addProduct} from "../../actions/products";

class Form extends Component {
    state = {
        name: '',
        price: '',
        quantity: '',
        description: '',
        image: '',

    }


    static propTypes = {
        addProduct: PropTypes.func.isRequired
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});
    onSubmit = e => {
        e.preventDefault();
        const {name, price, quantity, description, image } = this.state;
        const product = {name, price, quantity, description, image };
        this.props.addProduct(product);
        this.setState({
            name: "",
            price: "",
            quantity: "",
            description: "",
            image: "",

        });

    }



    render() {

        const { name, price, quantity, description, image  } = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Add Product</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            onChange={this.onChange}
                            value={name}
                        />
                    </div>
                    <div className="form-group">
                        <label>Image</label>
                        <input
                            className="form-control"
                            type="file"
                            name="image"
                            onChange={this.onChange}
                            value={image}
                        />
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input
                            className="form-control"
                            type="number"
                            name="price"
                            onChange={this.onChange}
                            value={price}
                        />
                    </div>
                    <div className="form-group">
                        <label>Quantity</label>
                        <input
                            className="form-control"
                            type="number"
                            name="quantity"
                            onChange={this.onChange}
                            value={quantity}
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            className="form-control"
                            type="text"
                            name="description"
                            onChange={this.onChange}
                            value={description}
                        />
                    </div>

                    <div className="form-group ">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(null,{addProduct})(Form);