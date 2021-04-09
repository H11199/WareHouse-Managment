import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import NavPage from './NavBar/NavPage';
import Products from './Products/Products';
import Tracker from './Tracker/Tracker';
import Product from './Product/Product';

import '../css/Styles.css';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/" exact component={NavPage} />
                    <Route path="/products" exact component={Products} />
                    <Route path="/track" exact component={Tracker} />
                    <Route path="/product" exact component={Product} />
                </div>
            </BrowserRouter>
        )
    };
};

export default App;