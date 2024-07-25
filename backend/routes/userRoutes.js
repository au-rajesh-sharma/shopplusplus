import express from 'express'
const router = express.Router()
import {authUser, registerUser, logoutUser, getUserProfile, 
    updateUserProfile, getUsers, getUserByID, deleteUser, 
    updateUser } from '../controllers/userController.js'

import {protect, admin} from '../middleware/authMiddleware.js'

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

export default router;
