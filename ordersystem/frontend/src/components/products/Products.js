import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {deleteProduct, getProducts} from "../../actions/products";
import {updateCart} from "../../actions/carts";

export class Products extends Component {
    static propTypes = {
        products : PropTypes.array.isRequired,
        getProducts: PropTypes.func.isRequired,
        deleteProduct: PropTypes.func.isRequired,
        updateCart: PropTypes.func.isRequired,
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
            this.props.updateCart(id,quantity);
        }
        this.setState({
            TheCart: []
        });
    }
    render() {
        const {quantity, id} = this.state
        return (
            //<form onSubmit={this.onSubmit}>
            <div className="rounded shadow ">
                <table className="table table-sm table-hover tab align-middle ">
                    <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>

                    </tr>
                    </thead>
                    <tbody>

                    {this.props.products.map((product) =>  (

                        <tr key={product.id}   >

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
                <form onSubmit={e => this.onSubmit(e)}>
                    <div className="text-end m-auto">
                        <button type="submit" className="btn btn-primary"  >Add To Cart</button>
                    </div>
                </form>

            </div>

            //</form>
        );
    }
}

const mapStatetoProps = state => ({
    products: state.products.products

})

export default connect(mapStatetoProps, { getProducts, deleteProduct, updateCart})(Products);
