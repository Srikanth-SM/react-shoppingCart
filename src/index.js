import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './index.css';
import App from './App';
import Home from './home';
import Product from './products';
import * as serviceWorker from './serviceWorker';
const align = {
    "margin": "10px"
}

ReactDOM.render(
    <Router>
        <div>
            <Home />
        </div>
    </Router>,


    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
