import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Product from './product';
import { getProducts } from './constants';
import Cart from './cart';
import Products from './products';

const align = {
    "margin": "10px"
}
let renderAllProducts = true;

class Home extends React.Component {
    constructor(props) {
        super(props);
        console.log("Home is Rendered");
        // window.sessionStorage.clear();
        let state = window.sessionStorage.state && { ...JSON.parse(window.sessionStorage.state) };
        console.log(state);
        let products = state && state.products ? state.products : getProducts();
        let itemsInCart = state && state.itemsInCart || [];
        let itemsPurchased = state && state.itemsPurchased || [];
        let renderAllProducts = state && state.renderAllProducts || true;
        console.log(products, itemsInCart);
        this.state = {
            products: products,
            itemsInCart: itemsInCart,
            itemsPurchased: itemsPurchased,
            renderAllProducts: renderAllProducts
        }
    }

    addToCart = (product) => {
        console.log("Inside add to cart");
        const t = this.state;
        this.setState((prevState) => {
            prevState.itemsInCart.push(product);
            return { itemsInCart: prevState.itemsInCart }
        }, () => { window.sessionStorage.state = JSON.stringify(this.state) });

    }

    removeFromCart = (id) => {
        console.log("remove from cart");
        const itemsInCart = this.state.itemsInCart;
        //finding the first matching item with id
        const index = itemsInCart && itemsInCart.findIndex((item) => {
            return item.id === id;
        });
        // removing the item at index and resizing the array, everything inplace.
        itemsInCart.splice(index, 1);
        this.setState(() => {
            return { itemsInCart: itemsInCart };
        }, () => { window.sessionStorage.state = JSON.stringify(this.state) });
    }

    addToItemsPurchased = (product) => {
        console.log("Inside addToItemsPurchased of Home");
        this.setState((prevState) => {
            prevState.itemsPurchased.push(product);
            return { itemsPurchased: prevState.itemsPurchased }
        }, () => { window.sessionStorage.state = JSON.stringify(this.state) });

    }

    renderAllProducts = () => {
        console.log("renderAllProducts");
        this.setState(() => { return { renderAllProducts: false } }, () => { window.sessionStorage.state = JSON.stringify(this.state) });
    }

    itemsInPurchased = () => {
        console.log("Inside itemsInPurchased");
        if (this.state.renderAllProducts) {
            this.setState(() => { return { renderAllProducts: false } }, () => { window.sessionStorage.state = JSON.stringify(this.state) });
        }
        renderAllProducts = false;
        const itemsPurchased = this.state.itemsPurchased;


        const htmlElement = itemsPurchased.map((product) => {
            const reviews = product.reviews.map((p) => {
                return <div>{p}</div>
            });
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
        product.reviews.push(event.target.getElementsByTagName("textarea")[0].value);

        products.splice(index, 1);
        this.setState((prevState) => {
            return { product: prevState.products.push(product) }
        }, () => { window.sessionStorage.state = JSON.stringify(this.state) });
    }

    render() {
        const itemsInCartLength = this.state.itemsInCart.length;
        const displayCart = itemsInCartLength <= 0 ? { display: "None" } : { display: "ppp" };
        renderAllProducts = true;

        return (
            <Router>
                <div>
                    <div className="container-fluid" >
                        <div className="row">
                            <div className="col-8">
                                <NavBar />
                                {this.state.renderAllProducts && <Products products={this.state.products} addToCart={this.addToCart} addToItemsPurchased={this.addToItemsPurchased} />}
                            </div>
                            <div className="col-4">
                                <div className="col-2">
                                    <nav className="navbar navbar-default navbar-fixed-top">
                                        <div className="navbar-header">
                                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                                <span className="sr-only">Toggle navigation</span>
                                                <span className="icon-bar"></span>
                                                <span className="icon-bar"></span>
                                                <span className="icon-bar"></span>
                                                <a className="navbar-brand" href="#">Mycart</a>
                                            </button>
                                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                                <ul className="nav navbar-nav">
                                                    <li className="active"><a href="#">Checkout <span className="sr-only">(current)</span></a></li>
                                                </ul>
                                                <ul className="nav navbar-nav navbar-right"  >
                                                    <li className="dropdown">
                                                        {
                                                            this.state.itemsInCart.length > 0 &&
                                                            <div>
                                                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"> <span className="glyphicon glyphicon-shopping-cart"></span> 7 - Items<span className="caret"></span></a>
                                                                <ul className="dropdown-menu dropdown-cart" role="menu">
                                                                    {this.state.itemsInCart && <Cart itemsInCart={this.state.itemsInCart} removeFromCart={this.removeFromCart} />}
                                                                </ul>
                                                            </div>
                                                        }
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                                <div className="col-2">
                                    <div className="dropdown">
                                        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                                            My orders
                                    </button>
                                        <div className="dropdown-menu">
                                            {/* <h5 class="dropdown-header">Dropdown header</h5> */}
                                            <a className="dropdown-item" href="/myorders/">List my Orders</a>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </ div >


                    {/* <Route path="/" exact render={(props) => { return <Home {...props} /> }} /> */}
                    <Route path="/products/:id" render={(props) => {
                        return <Product product={this.state.products} addToCart={this.addToCart} addToItemsPurchased={this.addToItemsPurchased} doesrenderAllProducts={this.state.renderAllProducts} renderAllProducts={this.renderAllProducts} disableLink={false} addReview={this.addReview} {...props} />
                    }} />
                    <Route path="/myorders/" render={(props) => { return this.itemsInPurchased(); }} />
                </div>

            </Router >

        )
    }
}
function NavBar(props) {
    return (
        <nav className="navbar navbar-default navbar-fixed-top">
            <div >
                <ul className="navbar-left">
                    <a style={align} href="/products/">Home</a>
                    <a style={align} href="#about">About</a>
                </ul>
            </div>
        </nav>
    );
}




export default Home;