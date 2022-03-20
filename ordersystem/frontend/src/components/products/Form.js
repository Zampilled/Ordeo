import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {addProduct} from "../../actions/products";

class Form extends Component {
    state = {
        name: '',
        price: '',
        description: '',
        image: '',

    }


    static propTypes = {
        addProduct: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});
    onSubmit = e => {
        e.preventDefault();
        const {name, price, description, image } = this.state;
        const product = {name, price, description, image };
        this.props.addProduct(product);
        this.setState({
            name: "",
            price: "",
            description: "",
            image: "",

        });

    }



    render() {

        const { name, price, description, image  } = this.state;
        const adminForm =(
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
                            accept="image/*"
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
                        <label>Description</label>
                        <textarea
                            className="form-control"
                            type="text"
                            name="description"
                            onChange={this.onChange}
                            value={description}
                        />
                    </div>

                    <div className="form-group mt-2 ">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>

            </div>
        )
        const userForm = (
            <div></div>
        )
        return(
            <div>
                {this.props.auth.isAdmin? adminForm: userForm}
            </div>
        );
    }
}
const mapStatetoProps = state => ({
    auth: state.auth
})

export default connect(mapStatetoProps,{addProduct})(Form);