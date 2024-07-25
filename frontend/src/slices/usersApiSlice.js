import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

//usersApiSlice is injecting endpoint reducers into parent apiSlice
//login action will be dispatched from login screen
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({//its a POST request
            query: (data) => ({//send email, pw in data
                //url: `${USERS_URL}/auth`,
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data, //send data in query body
            }), 
           
        }),

        register: builder.mutation({//its a POST request
            query: (data) => ({//send email, pw in data
                url: `${USERS_URL}`,//req on base url only
                //url: `${USERS_URL}/register`,
                method: 'POST',
                body: data, //send data in query body
            }), 
           
        }),


        logout: builder.mutation({//its a POST request
            query: () => ({
                //url: `${USERS_URL}/auth`,
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }), 
        }),

        profile: builder.mutation({//its a PUT request
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data, //send data in query body
            })
        }), 

        getUsers: builder.query({//its a GET request
            query: () => ({
                url: USERS_URL,
            }),
            providesTags: ['Users'],
            keepUnusedDataFor: 5,
        }),
    

        deleteUser: builder.mutation({//its a DELETE request
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE'
                }),
        }),

        getUserDetails: builder.query({//its a GET request
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
            }),
            keepUnusedDataFor: 5,
        }),

        updateUser: builder.mutation({//its a PUT request
            query: (data) => ({
                url: `${USERS_URL}/${data.userId}`,
                method: 'PUT',
                body: data,
                }),
                invalidateTags: ['User'],
        }),

    })
});
   
export const {useLoginMutation, useLogoutMutation, 
    useRegisterMutation, useProfileMutation,
    useGetUsersQuery, useDeleteUserMutation,
    useGetUserDetailsQuery, useUpdateUserMutation,} = usersApiSlice;