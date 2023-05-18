/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import './Card.scss';

const Card = (props) => {
    const {card} = props
    return (
        <>
            <div className="Card-item">
                {card.image
                    &&  <img src={card.image}
                    onMouseDown={event => event.preventDefault()} />
                }
                {card.title }
            </div>
        </>
    )
}

export default Card