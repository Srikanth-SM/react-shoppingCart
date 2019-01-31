import React from "react";
import Product from "./product";

class Order extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const align = {
      margin: "10px"
    };
    const itemsPurchased = this.props.data.itemsPurchased;
    console.log(this.props);
    console.log(itemsPurchased);
    let total = 0;
    let totalItems = Object.keys(itemsPurchased).length;
    let htmlElement = this.props.itemsPurchased();
    console.log(htmlElement);

    let itemsPurchasedList = Object.keys(itemsPurchased).map(key => {
      let item = itemsPurchased[key];
      total += item.totalPrice;
      return (
        <tr>
          <th style={{ textAlign: "center" }}>{item.id}</th>
          <th style={{ textAlign: "center" }}>{item.price}</th>
          <th style={{ textAlign: "center" }}>{item.quantity}</th>
          <th style={{ textAlign: "center" }}>{item.totalPrice}</th>
          <td>
            {/* <button NameName="btn btn-xs btn-danger pull-right" onClick={() => this.props.removeFromCart(item.id)}>X</button> */}
          </td>
        </tr>
      );
    });
    itemsPurchasedList.unshift(
      <tr>
        <th>Items</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total Price</th>
      </tr>
    );
    console.log(itemsPurchasedList);
    return (
      <div>
        <table class="table">
          <thead>
            total ={total} $<div>{itemsPurchasedList}</div>
          </thead>
        </table>
      </div>
    );
  }
}

export default Order;
