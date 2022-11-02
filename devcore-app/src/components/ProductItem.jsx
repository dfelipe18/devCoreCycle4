import React from "react";
import "../Product.css";
import { useGetUserAuth } from "../utilities/hooks/useGetUserAuth";
const ProductItem = ({data, addToCart})=> {
    const userAuth = useGetUserAuth();
    let {id, name,price, image} = data;
    return (
        <div className="pika">
        <div className="container">
            <div className="card">
                    <img className="image" src={image}></img>
                <div className="content">
                    <h3>{name}</h3>
                    <p>{name} - ${price}.00</p>
                    <div className="buy1">
                    <button class="custom-btn btn-12" onClick={() => addToCart(id)}><span>siuuuu!</span><span>Comprar</span></button>
                    </div>
                </div>
            </div>
        </div>
    </div>

//     <div classNameName="wrapper">
// 	<div classNameName="cards">
// 		<figure classNameName="card">
// 			<figcaption>{name} - ${price}.00 </figcaption>
// 		</figure>
//         <button onClick={()=> addToCart(id)}>Agregar</button>
// 	</div>
// </div>
    );
};

export default ProductItem;