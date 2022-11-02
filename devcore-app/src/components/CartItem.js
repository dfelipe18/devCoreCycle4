import React from "react";
import "../Cart.css";
const CartItem = ({data,delFromCart}) => {
let {id, name, price, quantity, image} = data;

    return (
        <div style ={{borderBottom: 'Thin solid gary'}}>
                <img className="image1" src={image}></img>
            <h4>{name}</h4>
            <h5>${price}.00 x {quantity} =${price * quantity}.00 </h5>
            <button className="custom-btn btn-6" onClick={() => delFromCart(id)}>Eliminar uno</button>
            <br/>
            <button className="custom-btn btn-6" onClick={() => delFromCart(id, true)}>Eliminar todos</button>
        </div>
    );
};

export default CartItem;