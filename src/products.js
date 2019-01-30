import React from 'react';
import Product from './product';

const alignItems = {
    "display": "flex", "flexWrap": "wrap"
}
class Products extends React.Component {
    constructor(props) {
        super(props);
    }

    addToItemsPurchased = (product) => {
        console.log("Inside addToItemsPurchased of Products");
        this.props.addToItemsPurchased(product);
    };


    addToCart = (product) => {
        console.log("Inside addToCart of Products");
        this.props.addToCart(product);
    };

    render() {
        const products = this.props.products;
        const productList = products.map((product) => {
            return (
                <Product product={product} key={product.id} addToCart={this.addToCart} addToItemsPurchased={this.addToItemsPurchased}></Product >
            )
        });
        return (
            <div style={alignItems}>
                {productList}
            </div >
        )
    }
}

export default Products