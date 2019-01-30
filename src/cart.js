import React from 'react';
import Product from './product';

class Cart extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const align = {
            margin: "10px"
        }
        const itemsInCart = this.props.itemsInCart;
        console.log(this.props);
        console.log(itemsInCart);
        let total = 0;
        let itemsInCartList = itemsInCart.map((item) => {
            total += item.price;
            return (
                <div key={item.id}>
                    <li>
                        <div style={align}>
                            <span className="item">
                                <span className="item-left">
                                    <img src="..." alt="" />
                                    <span className="item-info">
                                        <span>{item.name}</span>
                                        <span style={align}>{item.price}$</span>
                                    </span>
                                </span>
                                <span className="item-right">
                                    <button className="btn btn-xs btn-danger pull-right" onClick={() => this.props.removeFromCart(item.id)}>X</button>
                                </span>
                            </span>
                        </div>
                    </li >
                </div >
            )
        })
        console.log(itemsInCartList)
        return (
            <div>
                total ={total} $
                < div >
                    {itemsInCartList}
                </div >
            </div >
        )
    }
}

export default Cart;