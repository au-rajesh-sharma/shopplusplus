import path from 'path'
//instead of common js syntax
//const express = require('express')
// using es syntax, because in package.json, “type”: “module” 
import express from 'express' 
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

//import products from './data/products.js'

const port = process.env.PORT || 5000//frontend is running on 3000

connectDB(); // connect to MongoDB

const app = express()

//let server get req body data as json object thru this parser middleware
app.use(express.json()) 

//let server get req body data from url
app.use(express.urlencoded({extended: true})) 

//use cookie parser middleware. 
//It will allow to access req.cookies.jwt
app.use(cookieParser())


app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

//add the route/endpoint to pay pal. send res as paypal client id from .env file
app.get('/api/config/paypal', (req, res) => res.send({
    clinetid: process.env.PAYPAL_CLIENT_ID}))

if (process.env.NODE_ENV === 'production') {//in production env
    const __dirname = path.resolve();//get current directory name
    //make /upload dir as static in cuurent diretory/given path
    app.use('/uploads', express.static('/var/data/uploads'));
    //use built version of the app from frontend build
    app.use(express.static(path.join(__dirname, '/frontend/build')));
      
    //any route that is not api call to server, 
    //will be redirected to index
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
} else {//in development env
    const __dirname = path.resolve();//get current directory name
    //make uploads as static curr dir/uploads
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
    //show msg 
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}
      

//set dirname to current directory 
const __dirname = path.resolve()
//prefix dirname to '/uploads'. use this instead of '/uploads'
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => 
    console.log(`Server running on port ${port}`))

