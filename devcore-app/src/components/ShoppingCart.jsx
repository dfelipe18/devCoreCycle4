import { useReducer } from "react";
import { useState, useContext } from "react";
import {
  shoppingInitialState,
  shoppingReducer,
} from "../reducers/shoppingReducer";
import React from "react";
import ProductItem from "./ProductItem";
import "../App.css";
import AppNavBar from "./page/AppNavBar";
import CartItem from "./CartItem";
import { TYPES } from "../actions/shoppingActions";
import { useGetUserAuth } from "../utilities/hooks/useGetUserAuth";
import { DataContext } from "../utilities/hooks/DataContext";

const ShoppingCart = () => {
  const {dataCart, setDataCart, dataProducts, setDataProducts} = useContext(DataContext);
  consolelog(dataProducts)
  const userAuth = useGetUserAuth();
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);

  const { products, cart } = state;

  const addToCart = (id) => {
    // console.log(id);
    dispatch({ type: TYPES.ADD_TO_CART, payload: id });
  };

  const delFromCart = (id, all = false) => {
    //console.log(id, all);
    if (all) {
      dispatch({ type: TYPES.REMOVE_ALL_FROM_CART, payload: id });
    } else {
      dispatch({ type: TYPES.REMOVE_ONE_FROM_CART, payload: id });
    }
  };

  const clearCart = () => {
    dispatch({ type: TYPES.CLEAR_CART });
  };

  return (
      <>
        <h2 className="title1">Pokenmones</h2>
        <article className="box grid-responsive">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              data={product}
              addToCart={addToCart}
            />
          ))
          }
        </article>
        {userAuth.role !== undefined && userAuth.role !== "administradores" && (
          <div>
            <h2 className="title1">Carrito</h2>
            <article className="box grid-responsive">
              <button className="custom-btn btn-6" onClick={clearCart}>Limpiar Carrito</button>
              {cart.map((item, index) => (
                <CartItem key={index} data={item} delFromCart={delFromCart} />
              ))}
            </article>
          </div>
        )}
      </>
  );
};
export default ShoppingCart;

// import React from "react";
// import "../Product.css";
// import { useGetUserAuth } from "../utilities/hooks/useGetUserAuth";
// const ProductItem = ({data, addToCart})=> {
//     const userAuth = useGetUserAuth();
//     let {id, name,price, image} = data;
//     return (
//     <div className="container">
//     <div className="card">
//         <div className="card-header">
//             <img src={image} alt="rover" />
//         </div>
//         <div className="card-body">
//             <span className="tag tag-teal">{name}</span>
//             <h4>
//             ${price}.00 
//             </h4>
//             <p>
//                 An exploration into the truck's polarising design
//                 <button className="custom-btn btn-12" onClick={() => addToCart(id)}><span>siuuuu!</span><span>Comprar</span></button>
//             </p>
//         </div>
//     </div>
// </div>
//     );
// };

// export default ProductItem;

// import React from "react";
// import "../Cart.css";
// const CartItem = ({data,delFromCart}) => {
// let {id, name, price, quantity, image} = data;

//     return (
//         <div style ={{borderBottom: 'Thin solid gary'}}>
//                 <img className="image1" src={image}></img>
//             <h4>{name}</h4>
//             <h5>${price}.00 x {quantity} =${price * quantity}.00 </h5>
//             <button className="custom-btn btn-6" onClick={() => delFromCart(id)}>Eliminar uno</button>
//             <br/>
//             <button className="custom-btn btn-6" onClick={() => delFromCart(id, true)}>Eliminar todos</button>
//         </div>
//     );
// };

// export default CartItem;