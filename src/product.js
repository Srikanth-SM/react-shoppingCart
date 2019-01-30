import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

const align = {

    "width": "30%", "margin": "10px"
}
const margin = {
    margin: "10px"
}

class Product extends React.Component {
    constructor(props) {
        super(props);

    }

    handleSubmit = (event, id) => {
        event.preventDefault();
        this.props.addReview(event, id);
        console.log("add review button clicked");
    }

    render() {
        const product = this.props.hasOwnProperty("match") ? this.props.product.filter((product) => { return product.id == this.props.match.params.id })[0] : this.props.product;
        console.log("props", this.props);
        // this.props.hasOwnProperty('match') ? this.setState({ disableLink: false }) : this.state.disableLink == false && this.setState({ disableLink: true })
        if (this.props.doesrenderAllProducts == true && this.props.hasOwnProperty('match')) {
            this.props.renderAllProducts();
        }
        return (
            < div className="card" style={align} >
                < img className="card-img-top" src="..." alt="Card image cap" ></img >
                <div className="card-body">
                    {
                        this.props.disableLink == false ?
                            <h5 className="card-title">{product.name}</h5> :
                            <Link to={"/products/" + product.id}>
                                <h5 className="card-title">{product.name}</h5>
                            </Link>
                    }
                    <p className="card-text">{product.description}</p>
                    <div className="card-body">{product.price}$</div>
                    {this.props.addToCart && <button style={margin} className="btn btn-primary" type="button" onClick={() => this.props.addToCart(product)}>add to cart</button>}
                    {this.props.addToItemsPurchased && <button style={margin} className="btn btn-primary" onClick={() => this.props.addToItemsPurchased(product)}>Buy</button>}
                    {
                        this.props.disableLink == false &&
                        <form onSubmit={(event) => { this.handleSubmit(event, product.id); this.props.history.push('/products/'); window.location.reload() }}>
                            <div>Add Review <br />
                                <textarea name="review" id="" cols="30" rows="10" > </textarea>
                            </div>
                            <button type="submit">Add Review</button>
                        </form>
                    }
                </div >
            </div >
        )
    }
}



export default Product;

