import express from 'express'
import {loginUser,registerUser, tokenValidity} from '../controllers/user.controller.js'

const UserRouter = express.Router()

UserRouter.post('/login', loginUser)
UserRouter.post('/register', registerUser)
UserRouter.post('/tokenValidity', tokenValidity)

export default UserRouter