import React from 'react';
import { Link } from 'react-router-dom';

import smart from '../../images/smart.jpg';
class NavPage extends React.Component {

    render() {
        return (
            <div className="dashboard">
                <nav className="menu" tabIndex="0">
                    <div className="smartphone-menu-trigger"></div>
                    <header className="avatar">
                        <img src="https://s3.amazonaws.com/uifaces/faces/twitter/kolage/128.jpg" />
                        <h2>Ware-House</h2>
                    </header>
                    <ul>
                        <li tabindex="0" className="icon-dashboard"><Link style={{ color: "white", textDecoration: "none" }} to='/products'><span>Products</span></Link></li>
                        <li tabindex="0" className="icon-settings"><Link style={{ color: "white", textDecoration: "none" }} to='/track'><span>Tracker</span></Link></li>
                    </ul>
                </nav>
                <div className="first_content back">
                    <p>
                        Welcome To Smart Ware-House
                        <span className="back"> Management </span>
                    </p>
                    <img src={smart} height="250px"></img>
                </div>
            </div>
        )
    }
}

export default NavPage;