import mongoose from 'mongoose'
const SellerSchema= mongoose.Schema(
    {
        fullName:{
            type:String,
            required: [true, "Please enter name"]
        },
        email:{
            type:String,
            required:[true,"please enter an email"],
            unique:[true]
        },
        pasword:{
            type:String,
            required:[true,"please enter a password"]
        } 
    },
    {
        timestamp: true
    }
)

const Seller = mongoose.model('Seller', SellerSchema)
export default {Seller}