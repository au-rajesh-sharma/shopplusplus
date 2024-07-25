import { ORDERS_URL, PAYPAL_URL } from "../constants";
import { apiSlice } from "./apiSlice";

//usersApiSlice is injecting endpoint reducers into parent apiSlice
//login action will be dispatched from login screen
export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({//its a POST request
            query: (order) => ({//query will receive order data
                url: ORDERS_URL,
                method: 'POST',
                body: {...order},
            }), 
        }),
           
        getOrderDetails: builder.query({//its a GET request
            query: (orderId) => ({//query will receive order data
                url: `${ORDERS_URL}/${orderId}`,
                method: 'GET',
            }), 
            keepUnusedDataFor: 5
        }),
        
        //for updating payment data/result
        payOrder: builder.mutation({//its a PUT request
            query: ({orderId, details}) => ({//query will receive orderid, pmt result
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: { ...details },
            }), 
        }), 

        //getPayPalClientId for  
        getPaypalClientId: builder.query({//its a GET request
            query: () => ({//query will receive order data
                url: PAYPAL_URL,
                //method: 'GET' by default,
            }), 
            keepUnusedDataFor: 5,
        }),
        
        //getMyOrders  
        getMyOrders: builder.query({//its a GET request
            query: () => ({//query will return order data
                url: `${ORDERS_URL}/myorders`,
                //method: 'GET' by default,
            }), 
            keepUnusedDataFor: 5,
        }),

        //getOrders for admin 
        getOrders: builder.query({//its a GET request
            query: () => ({//query will return order data
                url: ORDERS_URL,
                //method: 'GET' by default,
            }), 
            keepUnusedDataFor: 5,
        }),
        
        //deliverOrder for admin 
        deliverOrder: builder.mutation({//its a PUT request
            query: (orderId) => ({//query will return order data
                url: `${ORDERS_URL}/${orderId}/deliver`,
                method: 'PUT',
            }), 
         }),

    })
})
    
export const {useCreateOrderMutation, useGetOrderDetailsQuery,
    useGetPaypalClientIdQuery, usePayOrderMutation, 
    useGetMyOrdersQuery, useGetOrdersQuery, useDeliverOrderMutation,
 } = ordersApiSlice;