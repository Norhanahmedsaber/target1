import Order from '../Models/Order.js';  

const createOrder = async (req, res) => {
  try {
    const { cartId, shippingInfo, payment } = req.body;

    const newOrder = new Order({
      order: { cartId },
      shippingInfo,
      payment,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default{ createOrder };

// import order from '../Models/Order.js'
// import generateErrorMessage from '../utils/generateErrorMessage.js'

// // async function getOrders(){
// //     try{
// //         let myorders = await await order.find().populate({
// //             path:"items.productId",
// //             select:"title price total"
// //         })
// //         if(!myorders)
// //         {
// //             generateErrorMessage(400 , "There is no orders. ")
// //         }
// //         if(myorders.items.length == 0)
// //         {
// //             myorders.items = []
// //             myorders.subTotal=0
// //             const data = await myorders.save()
// //             return {value:data}
// //         }  
// //         return {value:myorders}
// //     }catch(err)
// //     {
// //         return (err.message)
// //     }
// // }

// export default {
//     getOrders,
//     removeOrderItem
// }