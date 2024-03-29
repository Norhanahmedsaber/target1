import mongoose from 'mongoose'
const ClientSchema= new mongoose.Schema(
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
        password:{
            type:String,
            required:[true,"please enter a password"]
        },
        role:{
            type:String,
            enum:['CLIENT','SELLER']
        },
        token:{
            type:String
        }
    },
    {
        timestamp: true
    }
)

const User = mongoose.model('Client', ClientSchema)
export default User