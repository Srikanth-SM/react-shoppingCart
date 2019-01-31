import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';

const align = {

    "width": "40%", "margin": "10px"
}
const margin = {
    margin: "10px"
}

class Product extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            quantity: 0,
            redirect: false
        }
    }

    handleSubmit = (event, id) => {
        const element = event.target.getElementsByTagName("textarea")[0].value;
        event.preventDefault();
        console.log(event);
        this.setState(() => { return { redirect: true } }, () => { this.props.addReview(element, id); this.props.history.push("/"); });
    }
    componentWillMount() {
        this.setState((prevState) => {
            const id = this.props.product.id;
            // console.log(id);
            let quantity = prevState.quantity;
            if (this.props.data.itemsInCart && this.props.data.itemsInCart[id]) {
                quantity = this.props.data.itemsInCart[id].quantity;
            }
            return { quantity: quantity }
        }, () => { console.log(this.state) })
    }

    changeQuantity = (event) => {
        // document.getElementById("quantity").value += value;
        const val = parseInt(event.target.value)
        event.preventDefault();
        // console.log(event);
        this.setState((prevState) => {
            console.log(event, this.props);
            return {
                quantity: prevState.quantity + parseInt(val) > 0 ? prevState.quantity + parseInt(val) : 0
            }
        })
    }

    render() {

        let product = this.props.hasOwnProperty("match") ?
            this.props.product.filter((product) => { return product.id == this.props.match.params.id })[0] : this.props.product,
            addToCart = this.props.addToCart;
        // console.log(addToCart);
        let enableButtons = !(product.id in this.props.data.itemsPurchased);

        return (
            <div className="card" style={align}>
                <img className="card-img-top" src="..." alt="Card image cap"></img>
                <div className="card-body">
                    {
                        this.props.disableLink ?
                            <h5 className="card-title">
                                {product.name}

                            </h5> :
                            <Link to={`/products/${product.id}`} >
                                <h5 className="card-title">
                                    {product.name}

                                </h5>
                            </Link>
                    }
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="card-text">${product.price}</p>

                    {
                        enableButtons &&
                        < div >
                            < span >
                                <button className="btn btn-light" value="-1" onClick={(event) => this.changeQuantity(event)}>-1</button>
                                <span style={margin} id="quantity">{this.state.quantity}</span>
                                <button className="btn btn-light" value="1" onClick={(event) => this.changeQuantity(event)}>1</button>
                            </span>
                            <span>
                                <div>
                                    <button style={margin} onClick={() => addToCart(product, this.state.quantity)}>  add to cart</button>
                                </div>
                            </span>
                            <span>
                                <div>
                                    <button style={margin} onClick={() => this.props.addToItemsPurchased(product, this.state.quantity)}>  Buy </button>
                                </div>
                            </span>
                        </div>
                    }

                    {
                        this.props.disableLink &&
                        <form onSubmit={(event) => { this.handleSubmit(event, product.id); }}>
                            {/* <div>Add Review <br /> */}
                            {/* <textarea id="review" id="" cols="30" rows="10" > </textarea> */}
                            {/* </div> */}
                            {/* <button type="submit">Add Review</button> */}
                        </form>
                    }
                </div>
            </div >
        )
    }
}

const ButtonComponent = (props) => {
    const handleClick = () => {
        console.log(props.text);
    };

    return (
        <button className="btn btn-light" value={props.value} onClick={props.changeQuantity(props.value)}>{props.value}</button>
    );
};

export default Product;

