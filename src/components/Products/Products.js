import axios from 'axios';
import React from 'react';

import Card from './Card';
import Products_detail from './ProductData';

class Products extends React.Component {

    state = { tmp: [] }

    helper = async () => {
        const response = await axios.get("http://localhost:8080/api/get_info");
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
            let x = (response.data[i].x_cord / 20) - 1;
            let y = (response.data[i].y_cord / 20) - 1;
            let z = 6 - x;
            let index = x * (x + z) + y;
            console.log(index);
            Products_detail.det[index]._id = response.data[i]._id;
            Products_detail.det[index].serial_number = response.data[i].serial_number;
            Products_detail.det[index].manufacturer = response.data[i].manufacturer;
            Products_detail.det[index].item_type = response.data[i].item_type;
            Products_detail.det[index].date_of_entry = response.data[i].date_of_entry;
            Products_detail.det[index].date_of_expiry = response.data[i].date_of_expiry;
            Products_detail.det[index].x_cord = response.data[i].x_cord;
            Products_detail.det[index].y_cord = response.data[i].y_cord;
        }
        for (let i = 0; i < Products_detail.det.length; i++) {
            console.log(Products_detail.det[i]);
        }
        this.setState({
            tmp: Products_detail.det
        });
    }

    componentDidMount() {
        this.helper();
    }

    onrenderList = () => {
        for (let i = 0; i < this.state.tmp.length; i++) {
            console.log(this.state.tmp[i]);
        }
        return this.state.tmp.map((item) => {
            return <Card item={item} key={item.id} />
        })
    }

    render() {
        return (
            <div>
                <header className="card__header">
                    <h1>Stored Products</h1>
                </header>
                <div className="band">
                    {this.onrenderList()}
                </div>
            </div>
        )
    }
}

export default Products;