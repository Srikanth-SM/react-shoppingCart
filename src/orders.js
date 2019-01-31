import React from 'react';
import Product from './product';

class Order extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const align = {
            margin: "10px"
        }
        const itemsPurchased = this.props.data.itemsPurchased;
        console.log(this.props);
        console.log(itemsPurchased);
        let total = 0;
        let totalItems = Object.keys(itemsPurchased).length;
        let htmlElement = this.props.itemsPurchased();
        console.log(htmlElement);


        let itemsPurchasedList = Object.keys(itemsPurchased).map((key) => {
            let item = itemsPurchased[key];
            total += item.totalPrice;
            return (
                <div>
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
                                    {/* <button NameName="btn btn-xs btn-danger pull-right" onClick={() => this.props.removeFromCart(item.id)}>X</button> */}
                                </td>
                            </tr>
                        </tbody>
                    </table >
                    {/* {htmlElement} */}
                </div>




            )
        })
        console.log(itemsPurchasedList)
        return (
            <div>
                total ={total} $
        < div >
                    {itemsPurchasedList}
                </div >
            </div >
        )
    }
}

export default Order;