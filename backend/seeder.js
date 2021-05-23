import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/user.model.js';
import Product from './models/product.model.js';
import Order from './models/order.model.js';

import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        //array of users we create
        const createdUsers = await User.insertMany(users)
        //id of admin
        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map((product) => {
            return{...product, user: adminUser}
        })
        await Product.insertMany(sampleProducts)
        
        console.log('Data Imported!')
        process.exit()
    }catch(error){
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData = async ()=> {
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed')
        process.exit()
    }catch(error){
        console.error(`${error}`)
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}