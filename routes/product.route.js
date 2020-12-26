import express from 'express'
import {
  getProducts,
  searchProducts,
  getOneProduct,
  addProducts,
  updateProducts,
  deleteProducts,
} from '../controllers/product.controller.js'
import Authenticate from '../controllers/middlewares/authenticate.middleware.js'

const ProductRouter = express.Router()

ProductRouter.get('/', getProducts)
ProductRouter.get('/item', searchProducts)
ProductRouter.get('/item/:id', getOneProduct)
ProductRouter.post('/addKicks', Authenticate, addProducts)
ProductRouter.patch('/update/:id', Authenticate, updateProducts)
ProductRouter.delete('/delete/:id', Authenticate, deleteProducts)

export default ProductRouter
