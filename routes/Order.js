import express from 'express';

import order from '../controllers/Order.js'
const router = new express.Router()

router.post('/order', order.createOrder);
export default router
// router.get('/order' , async(req,res)=>{
//     try{
//         const result = await order.getorders()
//         if(!result)
//         {
//             res.status(400).json({
//                 message:result.message
//             })
//         }
//     res.status(200).json({
//         message:result.value
//     })
//     }catch(err){
//         console.log(err)
//         res.status(400).json({
//             message:"Somthing went wrong"
//         })
//     }
// })
// router.delete('/order/:productId', async (req, res) => {
//     try {
//         const productId = req.params.productId;
//         const result = await orderremoveOrderItem(productId);

//         res.status(200).json({
//             message: result
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(400).json({
//             message: "Something went wrong"
//         });
//     }
// });

// export default router