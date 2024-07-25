import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
//import jwt from 'jsonwebtoken'
import generateToken from "../utils/generateToken.js";

// @desc     Auth user and get token
// @route    POST /api/users/login
// @acess    public (could be private or private admin)
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user 
        && (await user.matchPassword(password))
    ) {
      generateToken(res, user._id);
  
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  });
  
// const authUser = asyncHandler(async (req, res) => {
//     const {email, password} = req.body //destructure req body

//     //find user with this email
//     const user = await User.findOne({email: email})

//     //match email and password. matchPassword is a function in user schema (model)
//     if(user 
//         //&& (await user.matchPassword(password))
//     ) {
//         //call utils generateToken() passing res, userId
//         generateToken(res, user._id)

//         //if match found, return details as an object in json format
//         res.status(200).json({
//             _id: user._id, name: user.name, 
//             email: user.email, 
//             isAdmin: user.isAdmin
//             //isAdmin: true
//         })
//     } else {//set status 401, throw error
//         res.status(401)
//         throw new Error('Invalid email or password')
//     }
// })

//@desc     register user
//@route    POST /api/users
//@acess    public (could be private or private admin)
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body //destructure req body
    
    //find user with this email
    const userExists = await User.findOne({email: email})
    //if user exists, responsd with a client error 400
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //create user in User model
    //if new user created, password will be encrypted 
    //thru User model pre save
    const user = await User.create({
        name, email, password })

    //if user created, respond with success
    if(user){

        //call utils generateToken() passing res, userId
        generateToken(res, user._id)

        res.status(201).json({
            _id: user._id, name: user.name, 
            email: user.email, isAdmin: user.isAdmin })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

//@desc     logout user and clear the cookies
//@route    POST /api/users/logout
//@acess    private (could be private or private admin)
const logoutUser = asyncHandler(async (req, res) => {
    //clear the cookie token (token name is jwt)
    res.cookie('jwt', '', {//set it to empty, and
        httpOnly: true,
        expires: new Date(0)// expires now

    })
    res.status(200).json({message: 'Logged out successfuly!'})
})

//@desc    get user profile
//@route   GET /api/users/profile
//@acess   private (could be private or private admin)
//we can get logged in user from req.user  
const getUserProfile = asyncHandler(async (req, res) => {
    //find the user from User model
    const user = await User.findById(req.user._id)

    //if found, return user data
    if(user){
        res.status(200).json({
        _id: user._id, name: user.name, 
        email: user.email, isAdmin: user.isAdmin })
    } else{ //throw error
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc    update user profile (user will update, no id, a token will be used)
//@route   PUT /api/users/profile
//@acess   private (could be private or private admin)
const updateUserProfile = asyncHandler(async (req, res) => {
    //find the user from User model
    const user = await User.findById(req.user._id)

    //if found, return user data
    if(user){
        //update field values. update only those fields that are 
        //sent in the body. if not in the body, keep old value
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin

        //if there is a password in the body, update it
        if(req.body.password){user.password = req.body.password}

        //save and return user data
        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id, name: updatedUser.name, 
            email: updatedUser.email, isAdmin: updatedUser.isAdmin })
    } else{ //user not found, throw error
        res.status(404)
        throw new Error('User not found')
    }

})

//@desc    get (all) users, an admin route
//@route   GET /api/users
//@acess   private/admin (could be private or private admin)
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
})

//@desc    get user by ID, an admin route
//@route   GET /api/users/:id
//@acess   private/admin (could be private or private admin)
const getUserByID = asyncHandler(async (req, res) => {
    //find user by id. select all fields, minus the password
    const user = await User.findById(req.params.id).select('-password')

    if(user) {res.status(200).json(user)}
    else {
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc    delete a user, an admin route
//@route   DELETE /api/users/:id
//@acess   private/admin (could be private or private admin)
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user) {//if user found
        if(user.isAdmin) {//if it's admin user
            res.status(400)//client error
            throw new Error('Cannot delete Admin User!')
        } else {
        await User.deleteOne({_id: user._id})
        res.status(200).json({message: 'User deleted successfully'})
        }
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc    update a user, an admin route
//@route   PUT /api/users/:id
//@acess   private/admin (could be private or private admin)
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
       
    if(user) {//if user found
        //set value of the fields to req.body values. 
        //if no value for a field in the body, set it to it's own value
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = Boolean(req.body.isAdmin) 
                      
        const updatedUser = user.save()
        
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            })
        }
        else {
            res.status(404)
            throw new Error('User not found')
        }
})

export {authUser, registerUser, logoutUser, getUserProfile, 
    updateUserProfile, getUsers, getUserByID, deleteUser, 
    updateUser };
