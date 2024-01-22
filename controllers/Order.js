import Order from '../Models/Order.js';  // Adjust the path accordingly

const createOrder = async (req, res) => {
  try {
    // Extract data from the request body
    const { cartId, shippingInfo, payment } = req.body;

    // Create a new order instance
    const newOrder = new Order({
      order: [{ cartId }],
      shippingInfo,
      payment,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Send the saved order as a response
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