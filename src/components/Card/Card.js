/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import './Card.scss';

const Card = (props) => {
    const {card} = props
    return (
        <>
            <li className="Card-item">
                {card.image &&  <img src={card.image} />}
                {card.title }
            </li>
        </>
    )
}

export default Card