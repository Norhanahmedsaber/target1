import cart from '../controllers/cart.js'
import  express  from 'express'
const router = new express.Router()

router.post('/cart' , async(req,res)=>{
    try{
        const payload={
            productId:req.body,
            quantity:Number.parseInt(req.body.quantity)
        }
        const result = cart.addItemToCart(payload)
        if(!result)
        {
            res.status(400),json({
                message:result.message
            })
        }
        res.status(200).json({
            message:result.value
        })
    }catch(error){
        console.log(error)
        res.status(400).json({
            message:"Something went wrong"
        })
    }

})

router.get('/cart' , async(req,res)=>{
    try{
        const result = await cart.getCart()
        if(!result)
        {
            res.status(400).json({
                message:result.message
            })
        }
    res.status(200).json({
        message:result.value
    })
    }catch(err){
        console.log(err)
        res.status(400).json({
            message:"Somthing went wrong"
        })
    }
})










export default router