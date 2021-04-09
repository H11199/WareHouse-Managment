import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { SelectedTrackId, selectedProductDetails } from '../../actions';

class Tracker extends React.Component {

    onTrack = async (event) => {
        event.preventDefault();
        const response = await axios.get(`http://localhost:8080/api/get_info_of_product/${this.props.serial_no}`);
        if (response.data === null) alert("Enter valid serial number!!!");
        this.props.selectedProductDetails(response.data);
    }

    render() {
        return (
            <body className="order">
                <header className="header__order">
                    <div className="header__title">
                        Track Order
                        <p className="header__line">
                            Get updates about Order status. Enter Order
                        </p>
                    </div>
                </header>
                <section className="track__section">
                    <form className="track__form">
                        <input type="text" id="fname" value={this.props.serial_no} onChange={(event) => this.props.SelectedTrackId(event.target.value)} name="fname" placeholder="Please Enter Serial Number" className="form__inp" />
                        <button className="btn fourth" onClick={this.onTrack}><Link to='/product' style={{ color: "black", textDecoration: "none" }}>Track</Link></button>
                    </form>
                </section>
            </body>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        serial_no: state.serial_no
    }
}

export default connect(mapStateToProps, { SelectedTrackId: SelectedTrackId, selectedProductDetails: selectedProductDetails })(Tracker);