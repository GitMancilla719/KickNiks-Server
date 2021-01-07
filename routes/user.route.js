import express from 'express'
import { loginUser, registerUser, tokenValidity, addToCart, getCart } from '../controllers/user.controller.js'

const UserRouter = express.Router()

UserRouter.post('/login', loginUser)
UserRouter.post('/register', registerUser)
UserRouter.post('/tokenValidity', tokenValidity)
UserRouter.patch('/add-to-cart/:id', addToCart)
UserRouter.get('/cart/:id', getCart)

export default UserRouter
