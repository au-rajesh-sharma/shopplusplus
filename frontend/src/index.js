import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
 } from 'react-router-dom'

//helmet-provider for page titles
import {HelmetProvider} from 'react-helmet-async'

//import paypal provider
import {PayPalScriptProvider} from '@paypal/react-paypal-js'

 import { Provider } from 'react-redux';
 import store from './store' 

//import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css'; //this is custom css styles file
import './assets/styles/index.css'; //this is css styles file
//import './index.css';
import App from './App';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoutes from './components/PrivateRoutes';
import AdminRoutes from './components/AdminRoutes';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route index={true} path='/' element={<HomeScreen />} /> 
      <Route path='/search/:keyword' element={<HomeScreen />} /> 
      <Route path='/page/:pageNumber' element={<HomeScreen />} /> 
      <Route path='/search/:keyword/page/:pageNumber' 
        element={<HomeScreen />} /> 
      <Route path='/product/:id' element={<ProductScreen />} /> 
      <Route path='/cart' element={<CartScreen />} /> 
      <Route path='/login' element={<LoginScreen />} /> 
      {/* <Route path='/auth' element={<LoginScreen />} />  */}
      <Route path='/register' element={<RegisterScreen />} /> 
      
   

    {/* add private routes component, and private routes withinb it */}
    {/* so, admin routes, as well as routes to profile will be private */}
    <Route path='' element={<PrivateRoutes />} >
        <Route path='/shipping' element={<ShippingScreen />} /> 
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} /> 
        <Route path='/order/:id' element={<OrderScreen />} /> 
        <Route path='/profile' element={<ProfileScreen />} /> 

    </Route>

    <Route path='' element={<AdminRoutes />} >
        <Route path='/admin/orderlist' element={<OrderListScreen />} /> 
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen />} />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} /> 
        <Route path='/admin/userlist' element={<UserListScreen />} /> 
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />   

    </Route>

    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    {/* we wrap router provider with Provider {store}
    for rendering */}
    <Provider store = {store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router = {router}/>
      </PayPalScriptProvider>
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
