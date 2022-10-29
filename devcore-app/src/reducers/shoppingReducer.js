import {TYPES} from "../actions/shoppingActions"

export const shoppingInitialState = {
    products: [
    {id:1, name: "producto 1", price:100},
    {id:2, name: "producto 2", price:200},
    {id:3, name: "producto 3", price:300},
    {id:4, name: "producto 4", price:400},
    {id:5, name: "producto 5", price:500},
    {id:6, name: "producto 6", price:600},
    {id:7, name: "producto 7", price:700},
    {id:8, name: "producto 8", price:800},
    ],
    cart:[],
};

export function shoppingReducer(state, action){
    switch (action.type){
        case TYPES.ADD_TO_CART:{
            let newItem = state.products.find((product) => product.id === action.payload);
            //console.log(newItem);

            let itemInCart = state.cart.find(item => item.id === newItem.id)

            return itemInCart 
            ?{
                ...state,
                cart: state.cart.map(item => 
                item.id === newItem.id 
                ? {...item, quantity: item.quantity +1}
                : item
                ),
            }
            :{
                ...state,
                cart: [...state.cart, {...newItem, quantity: 1}],
            } 
        }
        case TYPES.REMOVE_ONE_FROM_CART:{
            let itemToDelete = state.cart.find(item => item.id === action.payload);

            return itemToDelete.quantity > 1 ? {
                ...state,
                cart: state.cart.map(item => 
                    item.id === action.payload 
                    ? {...item, quantity:item.quantity -1}
                    :item
                    ),
            } : {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload),
            };
        }
        case TYPES.REMOVE_ALL_FROM_CART:{
            return  {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload),
            };
        }
        case TYPES.CLEAR_CART:
            return shoppingInitialState;
        default:
            return state;
    }
}