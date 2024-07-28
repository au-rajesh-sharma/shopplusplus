# shopplusplus - 'Rajesh Online Store'

## [Deployment Link:]

https://shopplusplus-bl0x.onrender.com/

** It takes a while to load **

## [GitHub Link:]

https://github.com/au-rajesh-sharma/shopplusplus


## [README.md Link]

https://github.com/au-rajesh-sharma/shopplusplus/blob/main/README.md


## Project Description:

The project application implements an online e-commerce store (with electronics products). The application is developped using MERN Stack - "react js" in frontend, "node express" in backend and "MongoDB Atlas cloud - mongoose" as database. The application is responsive and accomodates small, medium and large screens.

The application implements functionality for: normal users (customer) and admin users.

Normal users can browse products, search products, add to cart, update/delete from cart, login, place order, pay for their orders by PayPal (mock payment through PayPal sandbox url), view their profile/orders, update profile, and more.

Admin users can login, and -
view/add/edit/update/delete Products (including upload of image files); 
view/edit/update/delete users (admin users can't be deleted, password can't be updated); 
view order details, and mark as paid, mark as delivered.

## Important Things to note and follow:

*** for testing a user delete by admin, first register a new user (this user will get logged in), then log out this user, then login as admin, then delete this new user. 

if delete an existing user, the app may crash because the user being deleted may be referenced in existing order(s). ***

*** for testing a product delete by admin, first create a new product (by default, the product name will be 'sample name'). Then delete this new product ('sample name'). 

if delete an existing product, the app may crash because a product being deleted may be  referenced in existing order(s). ***

*** if upon app start / re-start, any user is already logged in (from previous log in), to be safe, please log out and log in again. A previous logged in user from local storage cache may crash the app **


## [Important login / PayPal details for running / testing the app]

### [Normal User (customer) login / register:]

existing user (customer) login:
email: user1@email.com
Password: 123456

or, register as new user with name, email, password (mock info)

### [Admin User Login:]

email: raj@email.com
Password: 123456

email: admin@email.com
Password: 123456

### [PayPal (sandbox) account Login to make order Payment:]

on pay order screen, after clicking yellow 'PayPal' button:

email: rsharma_bunty@yahoo.com
Password: 12345678

**_ Its a mock payment. No actual money will be paid.
Its a PayPal sandbox testing account _**

### [sandbox debit/credit card payment:]

    to make payment by card - button below PayPal yellow button
    (** again PayPal sandbox testing :)
        Name: rajesh sharma
        Phone: 0364608639
        Country: AU
        Card Number: 4239539035788480
        Expiry: 05/2029
        CVC Code: Any 3 digits
    
**_ Its a mock payment. No actual money will be paid.
Its a PayPal sandbox testing account _**

## [Frontend features]

    Redux state management (useState, useDispatch, useEffect), store, slices, reducers

    Parent slice with createApi and fetchBaseQuery

    Child API slices extending on parent api slice using apiSlice.injectEndpoints injecting mutation and query (ordersApiSlice, productsApiSlice and usersApiSlice)

    checks for protected routes (logged in as admin) - Admin Routes and Protected Routes (for logged in users)

    Header containing Brand, Nav, Search, nav dropdown

    Footer containing name, copyright and year

    Loader - isLoading

    error / err

    Message with toast

    Pagination

    Product Card, Product Carousel

    made changes to bootstrap css stylesheet (mainly for background-color, font-weight, font-italic, carousel-control, and more)

    Used own css stylesheet (for product rating/review, icons, carousel-caption and table)

    Product rating logic can accomodate any max rating (not only 5) to display rating stars. Logic implemented to show half stars also.

    Product Search searches for products containing trimmed search string. Search Box can serch for a substring or few letters contained in product name

    Checkout steps shown on screens: login, shipping, payment method, place order

    PayPal payment through PayPal sandbox (testing) url by PayPal login or pay by debit/credit card,

    After PayPal payment, queries PayPal that payment ref exists in PayPal, and also checks that its a new transaction

    Product carousel, product card

    use params, use navigate, navigate(-1),
    window.location.reload()

    Utils for cart price calculations

    React Icons, buttons, checkbox, radio, table, link
    container, container, links

    User input / validations checks all over

    And more, I can't remember all at this point

## [Frontend Technologies:]

    react v18.3.1:
        - React, useState, useEffect

    react-router-dom v6.23.1:
        - Outlet, Navigate, useNavigate, Link, useParams, useLocation, useNavigate

    react-redux v9.1.2:
        - useSelector,  useDispatch, Provider

    @reduxjs/toolkit v2.2.5:
        - createSlice, configureStore

    @reduxjs/toolkit/query/react:
        - createApi, fetchBaseQuery

     react-bootstrap v2.10.2:
        - Nav, Navbar, NavDropdown , Container, Row, Col, Badge, Spinner, Alert, Pagination, Card, Carousel, Image, Form, Button, ListGroup, ListGroupItem, Table

    react-router-bootstrap v0.26.2:
        - LinkContainer

     react-helmet-async v2.0.5:
        - Helmet, HelmetProvider

    react-toastify v10.0.5:
        - toast, ToastContainer, 'react-toastify/dist/ReactToastify.css'

    react-icons v5.2.1:
        - FaCheck, FaEdit, FaShoppingCart, FaUser, FaTrash, FaTimes, FaStar, FaStarHalfAlt, FaRegStar, FaSearch

    @paypal/react-paypal-js v8.5.0:
        - PayPalButtons, usePayPalScriptReducer. PayPalScriptProvider


    axios v1.7.2

    bootstrap v5.3.3

    react-dom v18.3.1

    react-scripts v5.0.1

## [Backend features]

    bcrypt password encryption implemented as pre save trigger in User model

    http only cookie for user login token generation and validation

    user email and encrypted password matching

    PayPal sandbox integration for making order payment and also payment verification

    checks on private routes for admin, protected routes for logged in users, implemented in authMiddleware

    controller API's methods serving http (POST, PUT, GET, DELETE) requests on routes

    created static path for product image file upload implemented in server.js

    And more, I can't remember all at this point


## [Backend Technologies:]

    Node.js v20.10.0:

    express v4.19.2:
    express

    cookie-parser v1.4.6:
    cookieParser

    jsonwebtoken v9.0.2:
    jwt

    multer v1.4.5-lts.1:
    multer

    mongoose v8.4.0
    isValidObject

    bcryptjs v2.4.3

    path:
    path


## [MongoDB Atlas (cloud) Database (Models, function, triggers)]

    shopplusplus database with products, users and orders collections

    products having nested array of documents for reviews

    orders having reference to user and contains array of cart items. each cart item references product

** user model has function to match password for user login:

    // Match user entered password to hashed password in database
    userSchema.methods.matchPassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password)
    }

** user model has pre save (trigger) to generate and save hashed encrypted password:

    userSchema.pre('save', async function (next) {
    //if password field is not involved, don't do anything
    if(!this.isModified('password')) { next() }
    else {
    //otherwise, generate hashed encrypted password and save in the user document
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    }
    })

## [Frontend App screens / work flow]

### [Screen Header - main and all other Screen]

Brand, Nav with Search, Cart, and Sign in or logged in user dropdown menu.

### [Screen Footer - main and all other Screen]

name, copyright, 2024

### [Home Screen Body:]

product cards with pagination, to click and go to "product detail screen".

### [Home screen Nav - Search component and search results screen:]

user can enter a complete/incomplete product name. It will search for all products containing search string, and display search result.

### [Home screen Nav - logged in user dropdown menu:]

#### [Profile (user profile screen):]

        view/update user profile.
        view user orders (table) with 'details' button to go to 'order details screen'.

#### [Logout:]

logs out user and clears the cart

### [Home screen Nav - logged in admin user "Admin Options" dropdown menu:]

#### [Products (screen):]

        Create new Product (will add one document with sample data), which has to be be edited later.
        View, edit/update, delete products in products table.

#### [Users (screen):]

        View, edit/update users in users table.
        (users can't be deleted. Password can't be edited).

#### Orders (screen):

        View Orders in orders table. go to order details by clikcing "details" button.
        On order details page, admin user will be able to "Mark as Paid" if order not paid, and "Mark as delivered" if order has been delivered.

### [Further Screens (workflow):]

#### [Product details screen]

        Here, user can chose quantity, add to cart, write product review, or go back. Max qty to chose is upto qty available in stock.

#### [cart screen:]

        Here, user can change qty, remove cart item(s), proceed to checkout, or go back to 'product details screen'.

#### [sign in screen]

        if user is not signed in, user is asked to sign in here.

#### [Shipping screen:]

        Here, user has to provide shipping address.

#### [Payment method screen:]

        Here, user can chose 'Payment Method'. By defualt, only 'PayPal' as payment method is shown and selected. It can't be changed.

#### [Place order screen:]

        Here, order details are shown. User can place order (button).

#### [Order (:id) details screen:]

##### [for customer (normal user):]

            Here, customer (normal user) can see name, email, shipping address, payment status (as not paid), delivery status (as not delivered). Customer can chose to pay by 'PayPal' or 'Dedit/Credit card'.

            to make payment by PayPal - sandbox testing
                login:
                rsharma_bunty@yahoo.com
                password: 12345678

            to make payment by card - PayPal sandbox testing :
                Name: rajesh sharma
                Phone: 0364608639
                Country: AU
                Card Number: 4239539035788480
                Expiry: 05/2029
                CVC Code: Any 3 digits

            After payment, payment status will show as paid, and payment info

##### [for Admin user:]

            Here, on order details screen, admin user can mark unpaid order as paid, and then mark delivered orders as 'delivered'.

## [Frontend Routes]

Frontend routes paths with elements to render:

     <Route path='/' element={<App />} >

        Route index={true} path='/' element={<HomeScreen />} />
        Route path='/search/:keyword' element={<HomeScreen />} />
        Route path='/page/:pageNumber' element={<HomeScreen />} />
        Route path='/search/:keyword/page/:pageNumber'
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

## [Frontend Providers for rendering the app:]

> <React.StrictMode>

    <HelmetProvider>
    {/* wrap router provider with Provider {store}
    for rendering */}
    <Provider store = {store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router = {router}/>
      </PayPalScriptProvider>
    </Provider>
    </HelmetProvider>

> </React.StrictMode>

## [Frontend (JSX) Components:]

    Admin Routes, Private Routes, Checkout Steps, Form Container, Header, Footer, Loader, Message, Paginate, Product Card, Product Carousel, Rating, Search Box

## [Frontend utils:]

    Cart Utils:
    for calculating cart total, tax and delivery

## [Frontend Constants:]

    BASE_URL = ''
    PRODUCTS_URL = '/api/products'
    USERS_URL = '/api/users'
    ORDERS_URL = '/api/orders'
    PAYPAL_URL = '/api/config/paypal'
    UPLOAD_URL = '/api/upload'


## [Backend utils:]

calcPrices:
for re-calculating order total, tax, shipping etc. in backend

PayPal:
verifyPayPalPayment: query PayPal to confirm payment ref exists after payment

checkIfNewTransaction: query PayPal to confirm it’s a new payment transaction

generateToken :
to generate jwt token using jwt secret, store it as http only cookie with same site as strict, and send back in response

## [Backend Middleware functions:]

asyncHandler

authMiddleware:
functions for protecting routes (protect - to check if user is logged in with valid token), and (admin - to check if user is isAdmin)

checkObjectId

errorMiddleware

## [Backend Routes, http requests and serving api methods:]

### [Order Routes:]

// all routes connected to '/api/orders'
router.route('/').post(protect, addOrderItems)
.get(protect, admin, getOrders)//protect for logged in admin users
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

### [Product Routes:]

//bring in protect and admin middleware
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/').get(getProducts)
.post(protect, admin, createProduct)
router.get('/top', getTopProducts)

//all routes below are on /api/products
router.route('/:id').get(checkObjectId, getProductById)
.put(protect, admin, checkObjectId, updateProduct)
.delete(protect, admin, checkObjectId, deleteProduct)
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview)

### [User Routes]

// all routes connected to '/api/users'
router.route('/').post(registerUser)
.get(protect, admin, getUsers)//protect for logged in admin users
router.post('/logout', logoutUser)
router.post('/login', authUser)

//use protect middleware function to protect
//user profiles for logged in users only
router.route('/profile').get(protect, getUserProfile)
.put(protect, updateUserProfile)

//protect for logged in admin users
router.route('/:id').delete(protect, admin, deleteUser)
.get(protect, admin, getUserByID)
.put(protect, admin, updateUser)

### [Product image file upload route:]

//create the route. upload is handled by the upload() middleware
router.post('/', (req, res) => {
uploadSingleImage(req, res, function (err) {

### [using these routes in server.js:]

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

## [.Env constants supplied to deployment:]

    MONGO_URI=mongodb+srv://aurajeshsharma:woPquB6mXTZVZR39@cluster0.h7slvrg.mongodb.net/shopplusplus

    JWT_SECRET=abc123

    PAYPAL_CLIENT_ID=ATqnen7uNcdaNudsxMfUeLo1mZKsvPZLVV7PhlaolUtXbq-pY3f82irCSw2Ho64GWJdcGkrkkyujWjdq

    CAROUSEL_PRODUCT_SIZE=4

    PAGINATION_LIMIT=4

    PAYPAL_APP_SECRET=EJPO0IQSf1JfGBSwNL7iCjkNvVL2_KjEmwVUwrzkTf40_TOGyeqzK29RHpJmSWzc1LkpGKPK3AC3Vx9C

    PAYPAL_API_URL=https://api-m.sandbox.paypal.com

## [scripts:]

    "start": "node backend/server.js",
    "server": "nodemon backend/server.js",
    "client": "npm start --prefix frontend",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "build": "npm install && npm install --prefix frontend && npm run build --prefix frontend"


## [Bug reports - no known bugs]

There are no bugs detected or known in the features/functionality implemented.

## [Further Feature suggestions]

The following features can (will) be added:

    Add Product categories (not just electronics). For example: 'Men's / Women's clothing', 'Furniture' ...

    Implement Product Sort (on rating, price, name - ascending/descending)

    Implement product filters (on category, price range)
