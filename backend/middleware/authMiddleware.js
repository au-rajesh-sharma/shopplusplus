import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/userModel.js'

//protect function to protect routes for only logged in users
const protect = asyncHandler(async (req, res, next) => {
    let token //declare token variable

    //read jwt from the cookie
    // jwt is the name of the token in 
    //userController.js  res.cookie('jwt', 
    token = req.cookies.jwt 

    if(token) {//check if token exist
        try {
            //get decoded using the values of token and secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //decoded is an object that has decoded.userId
            //so, check in User model if decoded.userId exist
            //if exist, get password also, and then add that user to req object 
            //this user object will be in req object in all routes
            //so, in userController, we can get logged in user from req.user  
            req.user = 
            await User.findById(decoded.userId).select('-password')

            //then call next middleware
            next()
        } catch (error) {//if token failed, user not found
            // console.log(error)

            res.status(401)
            throw new Error('Not Authorized, token failed')
        }


    } else {//no token, so not authorized
        res.status(401)
        throw new Error('Not Authorized, no token')
    }
})

// function for only admin users
const admin = (req, res, next) => {
    //if user exist in req, and its admin
    if(req.user && req.user.isAdmin) { next() }
    else {
        res.status(401)
        throw new Error('Not Authorized as admin')
    }
}

export {protect, admin};

