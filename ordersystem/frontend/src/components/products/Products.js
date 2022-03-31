import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {deleteProduct, getProducts } from "../../actions/products";
import {addToCart} from "../../actions/carts";

export class Products extends Component {
    static propTypes = {
        products : PropTypes.array.isRequired,
        getProducts: PropTypes.func.isRequired,
        deleteProduct: PropTypes.func.isRequired,
        addToCart: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
    };
    state = {
        TheCart: []
        }
    componentDidMount() {
        this.props.getProducts();

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
        console.log(this.state)
    }
    onSubmit(e) {
        console.log("submit")
        let TheCart = JSON.parse(JSON.stringify(this.state.TheCart))
        console.log(TheCart)
        for(let i = 0; i<TheCart.length;i++ ){
            let id, quantity  = 0;
            id = TheCart[i].id;
            quantity = TheCart[i].quantity;
            this.props.addToCart(id,quantity);
            console.log()
        }
        this.setState({
            TheCart: []
        });
    }
    render() {
        const {quantity} = this.state
        const adminProducts = (
            <div className="card card-body border-primary rounded shadow mt-2">
                <table className="table table-sm table-hover tab align-middle ">
                    <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <tr>Delete</tr>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.products.map((product) =>  (
                        <tr key={product.id}   >
                            <td><img src={product.image} alt="" className="rounded"  height="60" width="auto"></img></td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.description}</td>
                            <td>
                                <button
                                    onClick={this.props.deleteProduct.bind(this, product.id)}
                                    className="btn btn-danger btn-sm">
                                    {' '}
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        );
            const userProducts= (
                <div className="rounded shadow card card-body border-primary mt-2">
                    <table className="table table-sm table-hover tab align-middle ">
                        <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Quantity</th>
                        </tr>
                        </thead>
                        <tbody >
                        {this.props.products.map((product) =>  (
                            <tr key={product.id} className=""  >

                                <td><img src={product.image} alt="" className="rounded"  height="60" width="auto"></img></td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.description}</td>
                                <td className=" col-sm-1">

                                    <input type="number"
                                           className="form-control"
                                           name="quantity"
                                           placeholder="0"
                                           onChange={e => this.onChange(product.id,e)}
                                           value={quantity}
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="d-flex flex-row justify-content-end  align-items-center bd-highlight">
                        <form onSubmit={e => this.onSubmit(e)}>
                                <button type="submit" className="btn btn btn-success p-2 fw-bold "  >Add To Cart</button>
                        </form>
                    </div>
                </div>
            )


        return(
            <div className="container">

                {this.props.auth.isAdmin? adminProducts: userProducts}
            </div>
        )

    }
}

const mapStatetoProps = state => ({
    products: state.products.products,
    auth: state.auth
})

export default connect(mapStatetoProps, { getProducts, deleteProduct, addToCart})(Products);
