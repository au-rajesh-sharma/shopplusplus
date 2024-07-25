
function addDecimals(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
  }
  
  // NOTE: the code below has been changed from the course code to fix an issue
  // with type coercion of strings to numbers.
  // Our addDecimals function expects a number and returns a string, so it is not
  // correct to call it passing a string as the argument.
  
  export function calcPrices(orderItems) {
    // Calculate the items price in whole number (pennies) to avoid issues with
    // floating point number calculations
    const itemsPrice = orderItems.reduce(
      (acc, item) => acc + (item.price * 100 * item.qty) / 100,
      0
    );
  
    // Calculate the shipping price
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
  
    // Calculate the tax price
    const taxPrice = itemsPrice * 0.10;
  
    // Calculate the total price
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
  
    // return prices as strings fixed to 2 decimal places
    return {
      itemsPrice: addDecimals(itemsPrice),
      shippingPrice: addDecimals(shippingPrice),
      taxPrice: addDecimals(taxPrice),
      totalPrice: addDecimals(totalPrice),
    };
  }

// //helper function to convert value to 2 decimal places
// export const addDecimals = (num) => {
//     return (Math.round(num*100)/100).toFixed(2)
// }

// export const updateCart = (state) => {
//     //recalculate all item's price
//     state.itemsPrice = addDecimals(
//         state.cartItems.reduce(
//             (acc, item) => 
//             acc + item.price * item.qty, 
//             0))   
//         /* 
//     state.itemsPrice = ** set it to new re-calculated price
//     state.cartItems.reduce( ** use reduce function on cart.items[]
//         (acc, item) => **  arrow function with 2 arguments, accumulater (acc) and each item
//         acc + item.price * item.qty, ** add qty * price to acc (accumulater)
//         0) ** acc starting value is 0
//     */


//     //recalculate shipping cost (order > $100 = free shipping, else shipping = $10)
//     state.shippingPrice = addDecimals(
//         state.itemsPrice > 100 ? 0 : 10)  
             
//     //recalculate tax (10%)
//     state.tax = addDecimals(Number(state.itemsPrice * 0.10))

//     //recalculate total price
//     state.totalPrice = (
//         Number(state.itemsPrice) + 
//         Number(state.shippingPrice) + 
//         Number(state.tax)
//     ).toFixed(2)

//     //store updated state in browser loal storage
//     localStorage.setItem('cart', JSON.stringify(state))
    
//     return state
// }