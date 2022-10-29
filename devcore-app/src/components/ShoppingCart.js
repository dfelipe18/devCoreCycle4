import { useReducer } from "react";
import React from "react";
import { 
shoppingInitialState,
shoppingReducer,
} from "../reducers/shoppingReducer";
import ProductItem from "./ProductItem";
import "../App.css";
import AppNavBar from "./page/AppNavBar";
import CartItem from "./CartItem";
import { TYPES } from "../actions/shoppingActions";

const ShoppingCart = () => {
    const [state,dispatch] = useReducer(shoppingReducer, shoppingInitialState);

    const {products, cart}=state;

    const addToCart =(id) =>{
        // console.log(id);
        dispatch({type: TYPES.ADD_TO_CART, payload:id})
    };

    const delFromCart =(id, all = false) => {
        //console.log(id, all);
        if(all){
            dispatch({type: TYPES.REMOVE_ALL_FROM_CART, payload:id})
        } else {
            dispatch({type: TYPES.REMOVE_ONE_FROM_CART, payload:id})
        }
    };

    const clearCart =() => {
        dispatch({type: TYPES.CLEAR_CART});
    };

    return(
<div className="App">
    <header id="header" className="header">
        <AppNavBar />
    </header>
    <div>
        <h3>Carrito de compras</h3>
        <h3>Productos</h3>
        <article className="box grid-responsive">
            {products.map((product) => (<ProductItem key={product.id} data={product} addToCart={addToCart} />
            ))}
        </article>
        <h3>Carrito</h3>
        <article className="box">
            <button onClick={clearCart}>Limpiar Carrito</button>
            {
                cart.map((item, index) => <CartItem key={index} data={item} delFromCart={delFromCart} />)
            }
        </article>
    </div>
</div>

    );
};
export default ShoppingCart;
