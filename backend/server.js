import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import connectDB from './config/db.js';
import productRoutes from './routes/product.routes.js'
import userRoutes from './routes/user.routes.js'
import orderRoutes from './routes/order.routes.js'
import uploadRoutes from './routes/upload.routes.js'

import {notFound, errorHandler} from './middleware/errorMiddleware.js'

dotenv.config();

connectDB();

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
//allows to eccept json data in the body
app.use(express.json())



//returns from the backend
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req,res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/eshop-frontend/build')))
   app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'eshop-frontend', 'build', 'index.html')))
}else{
    app.get('/', (req, res) => {
        res.send('API is running...')
    })
}

app.use(notFound)

//middleware
app.use(errorHandler)


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))