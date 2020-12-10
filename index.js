import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import UserRouter from './routes/user.route.js'
import ProductRouter from './routes/product.route.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/user', UserRouter)
app.use('/products', ProductRouter)

const PORT = process.env.PORT || 5000
mongoose.connect(
    process.env.DB_CONN,
    {
        useNewUrlParser : true,
        useUnifiedTopology : true,
        useCreateIndex: true
    }
)
.then( ()=>app.listen(PORT), console.log('SERVER/DB : 200'))
.catch((err) => console.log(err.message))
mongoose.set('useFindAndModify', false)