import React from "react";
import "../Product.css";
const ProductItem = ({data, addToCart})=> {
    let {id, name,price} = data;
    return (
    <div className="wrapper">
	<div className="cards">
		<figure className="card">
			<figcaption>{name} - ${price}.00 </figcaption>
		</figure>
        <button onClick={()=> addToCart(id)}>Agregar</button>
	</div>
</div>
    );
};

export default ProductItem;