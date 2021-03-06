import KnUser from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

export const loginUser = async (req, res) => {
  const { _email, _password } = req.body
  try {
    if (!_email || !_password) return res.status(400).json({ msg: 'Please fill out all fields' })
    const _user = await KnUser.findOne({ KN_email: _email })
    if (!_user) return res.status(400).json({ msg: 'Invalid Email or Password' })
    const _passwordCheck = await bcrypt.compare(_password, _user.KN_password)
    if (!_passwordCheck) return res.status(400).json({ msg: 'Invalid Email or Password' })

    const token = jwt.sign({ id: _user._id }, process.env.JWT_TOKEN)
    //const token = jwt.sign({id: _user._id}, process.env.JWT_TOKEN, { expiresIn : '5s' }) //remove expire if bugs happen
    //const refreshToken = jwt.sign({id: _user._id}, process.env.JWT_SECRET_TOKEN)
    res.json({
      token: token,
      //refreshToken : refreshToken,
      loggedInUser: {
        id: _user._id,
        username: _user.KN_username,
        isAdmin: _user.KN_isAdmin,
      },
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const registerUser = async (req, res) => {
  const { _email, _password, _password2, _username } = req.body
  try {
    if (!_email || !_password || !_password2 || !_username)
      return res.status(400).json({ msg: 'Please fill out all fields' })
    if (_password < 8)
      return res.status(400).json({
        msg: 'Password does not meet the minimum length of 8 characters',
      })
    if (_password !== _password2) return res.status(400).json({ msg: 'Password does not match' })

    const checkIfExisting = await KnUser.findOne({ KN_email: _email })
    if (checkIfExisting) return res.status(400).json({ msg: 'This email is already registered' })

    const passwordEncrypt = await bcrypt.hash(_password, 10)
    const newUser = new KnUser({
      KN_email: _email,
      KN_password: passwordEncrypt,
      KN_username: _username,
    })
    const saveNewUser = await newUser.save()
    res.json(saveNewUser)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const addToCart = async (req, res) => {
  const userID = req.params.id
  const cartItems = req.body
  try {
    //crypto.randomBytes(64).toString('hex')
    if (!userID || !cartItems.length) return res.status(400).json({ msg: 'improper request' })

    const toUpdate = await KnUser.findByIdAndUpdate(userID, { $push: { KN_cart: cartItems } })
    if (!toUpdate) return res.status(400).json({ msg: 'There seems to be a problem adding the item into the cart' })

    res.json(toUpdate)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getCart = async (req, res) => {
  const userID = req.params.id
  try {
    if (!mongoose.Types.ObjectId.isValid(userID)) return res.status(400).json({ msg: 'invalid user ID' })
    const userCart = await KnUser.findById(userID)
    if (!userCart) return res.status(400).json({ msg: 'There seems to be a problem fetching your cart' })

    const userCartAndID = { userID: userCart._id, cart: userCart.KN_cart }
    res.json(userCartAndID)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const tokenValidity = async (req, res) => {
  const token = req.header('authToken')
  try {
    if (!token) return res.json(false)
    const verifyToken = jwt.verify(token, process.env.JWT_TOKEN)
    if (!verifyToken) return res.json(false)

    const tokenUserID = await KnUser.findById(verifyToken.id)
    if (!tokenUserID) return res.json(false)

    const tokenUser = {
      user_id: tokenUserID._id,
      isAdmin: tokenUserID.KN_isAdmin,
      validToken: true,
    }

    res.json(tokenUser)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
