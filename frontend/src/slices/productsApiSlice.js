import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

//productsApiSlice is injecting endpoint reducers into parent apiSlice
export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({keyword, pageNumber}) => ({//query will get page number to fetch data
                url: PRODUCTS_URL,
                params: { 
                    keyword,
                    pageNumber, 
                },//query will have param 
            }), 
            providesTags: ['Products'],//refresh all products
            keepUnusedDataFor: 5 //5 seconds
        }),

        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }), 
            keepUnusedDataFor: 5 //5 seconds
        }),

        getProductById: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }), 
            keepUnusedDataFor: 5 //5 seconds
        }),
    
    createProduct: builder.mutation({
        query: () => ({//no data passed, create with sample data
            url: PRODUCTS_URL,
            method: 'POST',
            }), 
        //invalidate catche data, no need to reload page
        invalidateTags: ['Product'],
        }),
   
    updateProduct: builder.mutation({
        query: (data) => ({
            url: `${PRODUCTS_URL}/${data.productId}`,
            method: 'PUT',
            body: data,
            }), 
        //invalidate catche data, no need to reload page
        invalidateTags: ['Products'],//to clear cache of all products
        }),

        uploadProductImage: builder.mutation({
        query: (data) => ({
            url: `${UPLOAD_URL}`,
            method: 'POST',
            body: data,
            }), 
        }),

        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
                
                }), 
            //invalidate catche data, no need to reload page
            invalidateTags: ['Products'],//to clear cache of all products
            }),
        
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data,
                }), 
            //invalidate catche data, no need to reload page
            invalidateTags: ['Product'],
            }),

        getTopProducts: builder.query({
            query: () => ({//no data passed, 
                url: `${PRODUCTS_URL}/top`,
                }), 
                //invalidate catche data, no need to reload page
                keepUnusedDataFor: 5,
            }),
    })
})

export const {useGetProductsQuery, useGetProductByIdQuery, 
    useGetProductDetailsQuery, useCreateProductMutation, 
    useUpdateProductMutation, useUploadProductImageMutation, 
    useDeleteProductMutation, useCreateReviewMutation, 
    useGetTopProductsQuery,          
    } = productsApiSlice;