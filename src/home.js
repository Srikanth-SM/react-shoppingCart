import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Product from './product';
import { getProducts } from './constants';
import Cart from './cart';
import Order from './orders';
import Products from './products';

const align = {
    "margin": "10px"
}
let renderAllProducts = true;
const alignItems = {
    "display": "flex", "flexWrap": "wrap"
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        console.log("Home is Rendered");
        window.sessionStorage.clear();
        let state = window.sessionStorage.state && { ...JSON.parse(window.sessionStorage.state) };
        console.log(state);
        let products = state && state.products ? state.products : getProducts();
        let itemsInCart = state && state.itemsInCart || {};
        let itemsPurchased = state && state.itemsPurchased || {};
        let renderAllProducts = state && state.renderAllProducts || true;
        console.log(products, itemsInCart);
        this.state = {
            products: products,
            itemsInCart: itemsInCart,
            itemsPurchased: itemsPurchased,
            renderAllProducts: renderAllProducts,
            totalCartItems: 0,
            totalpurchaseItems: 0
        }
    }

    addToCart = (product, quantity) => {
        if (quantity > 0) {
            console.log("Inside add to cart", product);
            const t = this.state;
            const id = product && product.id
            let cartTotal = this.state.cartTotal;
            this.setState((prevState) => {
                if (product[id] in prevState.itemsInCart) {
                    let itemInCart = prevState.itemsInCart[id];
                    itemInCart.quantity += quantity;
                    itemInCart.totalPrice = itemInCart.price * itemInCart.quantity;
                    prevState.itemsInCart[id] = itemInCart;

                }
                else {
                    prevState.itemsInCart[id] = { id: product.id, quantity: quantity, totalPrice: product.price * quantity, price: product.price };
                    cartTotal = prevState.itemsInCart[id].totalPrice;
                }

                return { itemsInCart: prevState.itemsInCart }
            }, () => {
                return this.setState({ totalCartItems: Object.keys(this.state.itemsInCart).length })
            })


        }
    }

    removeFromCart = (id) => {
        console.log("remove from cart");
        const itemsInCart = this.state.itemsInCart;
        delete itemsInCart[parseInt(id)];
        this.setState({ itemsInCart: itemsInCart });

    }

    addToItemsPurchased = (product, quantity) => {
        if (quantity > 0) {
            console.log("Inside addToItemsPurchased of Home");
            const id = product && product.id
            this.setState((prevState) => {
                if (product[id] in prevState.itemsPurchased) {
                    let itemPurchased = prevState.itemsPurchased[id];
                    itemPurchased.quantity += quantity;
                    itemPurchased.totalPrice = itemPurchased.price * itemPurchased.quantity;
                    prevState.itemsPurchased[id] = itemPurchased;
                }
                else {
                    prevState.itemsPurchased[id] = { id: product.id, quantity: quantity, totalPrice: product.price * quantity, price: product.price }
                }


                return { itemsPurchased: prevState.itemsPurchased };

            }, () => {
                return this.setState({ totalpurchaseItems: Object.keys(this.state.itemsPurchased).length })
            }, () => { this.setState({ itemInCart: {} }) });

        }

    }

    renderAllProducts = () => {
        console.log("renderAllProducts");
        this.setState(() => { return { renderAllProducts: false } });
    }

    itemsInPurchased = () => {
        console.log("Inside itemsInPurchased");
        if (this.state.renderAllProducts) {
            this.setState(() => { return { renderAllProducts: false } });
        }
        renderAllProducts = false;
        const itemsPurchased = this.state.itemsPurchased;


        const htmlElement = Object.keys(itemsPurchased).map((key) => {
            const product = itemsPurchased[key];
            console.log(product);
            const reviews = product.reviews && product.reviews.map((p) => {
                return <div>{p}</div>
            });
            console.log(reviews);

            return (
                < div className="card" key={product.id} style={align} > {product.name}
                    < img className="card-img-top" src="..." alt="Card image cap" ></img >
                    <div className="card-body">
                        <p className="card-text">{product.description}</p>
                        <div className="card-body">{product.price}$</div>
                    </div>
                    <div className="card-body">

                        {reviews}
                    </div>
                </ div>
            )
        })
        return htmlElement;
    }

    addReview = (event, id) => {
        console.log("Home add review");
        const products = this.state.products;
        const index = products && products.findIndex((product) => {
            return product.id == id;
        });
        console.log(event, id);
        let product = products[index];
        product.reviews = product.reviews ? product.reviews : [];
        product.reviews.push(event);

        products.splice(index, 1);
        products.push(product)
<<<<<<< HEAD
        products.sort((a, b) => parseInt(a.id) - parseInt(b.id));
=======
>>>>>>> e4c9178b89310e053fb0ca6b4baa065758a82bdb
        this.setState((prevState) => {

            return { products: products }
        }, () => { console.log(this.state) });
    }
    render() {
        // const itemsInCartLength = this.state.itemsInCart.length;
        // const displayCart = itemsInCartLength <= 0 ? { display: "None" } : { display: "ppp" };
        renderAllProducts = true;

        return (
            <div>
                <div className="container-fluid" >
                    <div className="row">
                        <div className="col-8">
                            <div >
                                <ul className="navbar-left">
                                    <Link to="/">Home</Link>
                                    <Route path="/" exact render={(props) => {
                                        const products = this.state.products;
                                        const productList = products.map((product) => {
                                            return <Product key={product.id} data={this.state} product={product} addToCart={this.addToCart} addToItemsPurchased={this.addToItemsPurchased} />
                                        })
                                        return (
                                            <div style={alignItems}>
                                                {productList}
                                            </div>
                                        )
                                    }} />
                                    <Route path="/Cart/" render={(props) => {
                                        return (Object.keys(this.state.itemsInCart).length > 0 ?
                                            <Cart data={this.state} addToCart={this.addToCart} addToItemsPurchased={this.addToItemsPurchased} addReview={this.addReview} disableLink={true} removeFromCart={this.removeFromCart}{...props} />
                                            : <div style={align}><h1>There are no items cart</h1></div>)
                                    }} />
                                    <Route path="/orders/" render={(props) => {
                                        return (Object.keys(this.state.itemsPurchased).length > 0 ?
                                            <Order data={this.state} addToCart={this.addToCart} addToItemsPurchased={this.addToItemsPurchased} addReview={this.addReview} disableLink={true} removeFromCart={this.removeFromCart} itemsPurchased={this.itemsInPurchased}{...props} />
                                            : <div style={align}><h1>There are no items buyed</h1></div>)
                                    }} />
                                </ul>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="row">
                                <div className="col-6">
                                    <Link to="/Cart" >Cart {this.state.totalCartItems > 0 && this.state.totalCartItems} </Link>

                                </div>
                                <div className="col-6">
                                    <Link to="/Orders" style={align}>Orders {this.state.totalpurchaseItems > 0 && this.state.totalpurchaseItems}</Link>
                                </div>
                            </div>

                        </div>


                        <Route path="/products/:id" render={(props) => {
                            return <Product product={this.state.products} data={this.state} addToCart={this.addToCart} addToItemsPurchased={this.addToItemsPurchased} addReview={this.addReview} disableLink={true} {...props} />
                        }} />
                        <Route path="/myorders/" render={(props) => { return this.itemsInPurchased(); }} />
                    </div>
                </div>
            </div >



        )
    }
}





export default Home;