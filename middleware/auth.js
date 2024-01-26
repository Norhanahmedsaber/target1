import jwt from 'jsonwebtoken';
import Cart from '../Models/cart.js';
import dotenv from 'dotenv'
import User from '../Models/User.js'

dotenv.config()

const auth = async (req , res , next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ' ,'Bearer ')
        const decoded = jwt.verify(token, process.env.SECRET)
        // console.log('Decoded Token:', token);

        const user = await User.findById(decoded._id)
        if(!user) throw new Error()
        req.user = user
        req.token = token

        req.cart = await Cart.findOne({ user: user._id });

        if (!req.cart) {
            // If the user doesn't have a cart, create one
            req.cart = await Cart.create({ user: user._id });
        }

        next()
    }catch(error) {
        res.status(401).send({
            message:"Not Authorized"
        })
    }
}

export default {
    auth
}