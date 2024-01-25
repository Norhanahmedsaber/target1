import cart from '../controllers/cart.js'
import middleware from '../middleware/auth.js'
import  express  from 'express'
const router = new express.Router()

router.post('/cart' ,middleware.auth, async(req,res)=>{
    try{
        const payload={
            productId:req.body.productId,
            quantity:Number.parseInt(req.body.quantity),
            user: req.user
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

router.delete('/deleteItem/:cartId/:itemId', cart.deleteItem);

export default router