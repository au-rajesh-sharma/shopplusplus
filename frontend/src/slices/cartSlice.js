import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

//if cart data exist in local storage, get it, otherwise
//initialize cartItemts to empty array
//cart has cartItems as [] and also other data, like shipping address, ..
const initialState = 
    localStorage.getItem('cart') ? 
    JSON.parse(localStorage.getItem('cart')) : 
    {cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal'}//paypal is default


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload//an item will be sent as payload

            //find if paylaod item exists in the cart items
            const existItem = state.cartItems.find((it) => 
                it._id === item._id)

            if(existItem) {//if payload item exists in cart array
                
                state.cartItems = // set cart to new updated state (cart array)
                //map over cartItems[]
                state.cartItems.map((it) => 
                    //find item matching existItem
                    it._id === existItem._id 
                    //if match found, replace matching array item with payload item
                    ? item 
                    //otherwise, replace array item with itself (do nothng)
                    : it)
            } else {//no matcch (payload item does not exist in cart array), add it
                state.cartItems = [...state.cartItems, item]

            }

            return updateCart(state) //use updateCart from cartUtils
        },

        //action will have _id of the item to remove
        removeFromCart: (state, action) => {
            const itemId = action.payload
            state.cartItems = state.cartItems.filter((it) => 
            it._id !== itemId)   
            
            return updateCart(state) //use updateCart from cartUtils
        },

        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload
            return updateCart((state))
        },

        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload
            return updateCart((state))
        },

        //when different user logs in, clear everything of previous user
        clearCartItems: (state, action) => {
            state.cartItems = []
            localStorage.setItem('cart', JSON.stringify(state))
        },
        
        resetCart: (state) => (initialState)
    },
})

//export addToCart, removeFromCart as cartSlice action
export const {addToCart, removeFromCart, 
    saveShippingAddress, savePaymentMethod,
    clearCartItems, resetCart} = cartSlice.actions

export default cartSlice.reducer;