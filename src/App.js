import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import Product from './product';
// import Home from './home';
// import { getProducts } from './constants';
// import Cart from './cart';
// import Products from './products';

class App extends React.Component {
  render() {
    return <div />;
  }
}

function Homes(props) {
  return (
    <div>
      hai
      <Route path="/about" component={About} />
      <Route path="/care" component={Care} />
    </div>
  );
}

function About(props) {
  return <div>About</div>;
}

function Care(props) {
  return <div>Care</div>;
}

export default App;
