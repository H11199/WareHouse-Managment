import React from 'react';

import img1 from '../../images/warehouse_image.png';

class Card extends React.Component {
    render() {
        return (
            <div className="item-1">
                <a href="https://design.tutsplus.com/articles/international-artist-feature-malaysia--cms-26852" className="card">
                    <div className="thumb"></div>
                    <article>
                        <h2>{this.props.item.serial_number}</h2>
                        <h2>{this.props.item.manufacturer}</h2>
                        <h2>{this.props.item.date_of_entry}</h2>
                        <h2>{this.props.item.date_of_expiry}</h2>
                        <h2>{this.props.item.item_type}</h2>
                        <h2>{this.props.item.x_cord}</h2>
                        <h2>{this.props.item.y_cord}</h2>
                    </article>
                </a>
            </div>
        )
    }
}

export default Card;