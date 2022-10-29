import {TYPES} from "../actions/shoppingActions"

export const shoppingInitialState = {
    products: [
    {id:1, name: "producto 1", price:100,image: "https://i.pinimg.com/originals/a4/7b/a5/a47ba59b4a353e0928ef0551ca44f980.jpg"},
    {id:2, name: "producto 2", price:200,image: "https://i.blogs.es/a7249d/eevee/450_1000.png"},
    {id:3, name: "producto 3", price:300,image: "https://i.blogs.es/c0203f/lillipup/450_1000.png"},
    {id:4, name: "producto 4", price:400,image: "https://i.blogs.es/8d1201/cubone/450_1000.png"},
    {id:5, name: "producto 5", price:500,image: "https://i.blogs.es/608da7/togepi/450_1000.png"},
    {id:6, name: "producto 6", price:600,image: "https://i.blogs.es/6cbd7e/jigglypuff/450_1000.png"},
    {id:7, name: "producto 7", price:700,image: "https://i.pinimg.com/564x/d1/90/74/d19074f6654183c156f257a82280492c.jpg"},
    {id:8, name: "producto 8", price:800,image: "https://www.kindpng.com/picc/m/0-8018_freetoedit-cute-kawaii-pokemon-carapuce-squirtle-imagenes-kawaii.png"},
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