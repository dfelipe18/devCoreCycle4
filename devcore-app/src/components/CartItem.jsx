import React from "react";

const CartItem = ({data,delFromCart}) => {
let {id, name, price, quantity} = data;

    return (
        <div style ={{borderBottom: 'Thin solid gary'}}>
            <h4>{name}</h4>
            <h5>${price}.00 x {quantity} =${price * quantity}.00 </h5>
            <button onClick={() => delFromCart(id)}>Eliminar uno</button>
            <br/>
            <button onClick={() => delFromCart(id, true)}>Eliminar todos</button>
        </div>
    );
};

export default CartItem;