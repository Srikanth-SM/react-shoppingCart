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
        const itemsInCart = this.props.data.itemsInCart;
        console.log(this.props);
        console.log(itemsInCart);
        let total = 0;
        let totalItems = Object.keys(itemsInCart).length;


        let itemsInCartList = Object.keys(itemsInCart).map((key) => {
            let item = itemsInCart[key];
            total += item.totalPrice;
            return (
                <table className="table table-striped table-inverse table-responsive">
                    <thead className="thead-inverse">
                        <tr>
                            <th>Items</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td scope="row">{item.id}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.totalPrice}</td>
                            <td>
                                <button NameName="btn btn-xs btn-danger pull-right" onClick={() => this.props.removeFromCart(item.id)}>X</button>
                            </td>
                        </tr>
                    </tbody>
                </table>


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