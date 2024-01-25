import Cart from '../Models/cart.js'
import productModel from'../Models/productModel.js'
import generateErrorMessage from '../utils/generateErrorMessage.js'
import auth from '../middleware/auth.js'

async function addItemToCart({productId , quantity}) {
    try{
        let cart = await cartdb();
        let productDetails = await productModel.findById(productId)// get the product details from product models 
        if(!productDetails)
        {
            return generateErrorMessage(500 , "Invalid Request")
        }
        //check if there is cart :
        if(cart)
        {
            //check if the index of item exist in db
            const indexOfItem = cart.items.findIndex(item => item.productId.id == productId)
            //remove product from the cart if not exist or quantity =0
            if(indexOfItem == -1 && quantity<=0 )
            {
                cart.items.splice(indexOfItem , 1)
                if(cart.items.length == 0)
                {
                    cart.subTotal = 0 
                }else{
                    //turn items total value to array and then sum it into one total value
                    cart.subTotal = cart.items.map(item => item.total).reduce((total , next) => total+next)
                }
            }
            //check if the product exxist 
            if(indexOfItem !== -1)
            {
                cart.items[indexOfItem].quantity += quantity
                cart.items[indexOfItem].total += cart.items[indexOfItem].quantity * productDetails.price
                cart.items[indexOfItem].price = productDetails.price

                cart.subTotal = cart.items.map(item => item.total).reduce((total , next) => total+next)
            }

            //check if the quatity greater than one 
            else if (quantity > 0)
            {
                cart.items.push({
                    productId:productId,
                    quantity:quantity,
                    price:productDetails.price,
                    total:parseInt(productDetails.price * quantity)
                })
                cart.subTotal = cart.items.map(item => item.total).reduce((total , next) => total+next)
            }
            else
            {
                return generateErrorMessage(400 , "Invalid request")
            }
            let data = await cart.save()
            return {value:data}
        }
        //create new cart if the cart is not exist 
        else{
            const cartData = {
                items:[{
                    productId:productId,
                    quantity:quantity,
                    total:parseInt(productDetails.price * quantity),
                    price:productDetails.price
                }],
                subTotal:parseInt(productDetails.price * quantity)
            }
            cart = await Cart.create(cartData)
            let data = await cart.save()
            // res.status(200).json(data);

            console.log(data+"b4of eh data deh ttttt")
            return { value: data };
        }
    }catch(err)
    {   
        console.log(err)
        //generateErrorMessage(400 , "Something went wrong")
    }
}

async function getCart(){
    try{
        let mycart = await cartdb()
        if(!mycart)
        {
            generateErrorMessage(400 , "Cart not found! ")
        }
        if(mycart.items.length == 0)
        {
            mycart.items = []
            mycart.subTotal=0
            const data = await mycart.save()
            return {value:data}
        }  
        return {value:mycart}

    }catch(err)
    {
        return (err.message)
        //generateErrorMessage(400 , "Something went Wrong! ")
    }
}

async function deleteItem(req, res, next) {
    const { cartId, itemId } = req.params;
  
    try {
      const cart = await Cart.findById(cartId);
  
      if (!cart) {
        return next(new AppError("Cart not found", 404));
      }
  
      const itemIndex = cart.items.findIndex((item) => item._id.toString() === itemId);
  
      if (itemIndex === -1) {
        return next(new AppError("Item not found in cart", 404));
      }
  
      cart.items.splice(itemIndex, 1);
  
      // Recalculate the subTotal
      cart.subTotal = cart.items.reduce((total, item) => total + item.total, 0);
  
      await cart.save();
  
      res.json({ message: "Item deleted successfully", cart });
    } catch (error) {
    //   return next(new AppError("Something went wrong", 500));
    }
  }

async function cartdb(req){
    
    const user = req.user;

    if (user && user.cart) {
        const cartId = user.cart; // Assuming cart is stored as an ID in the user object
        const cart = await Cart.findById(cartId).populate({
            path: "items.productId",
            select: "title price total"
        });

        return cart;
    } else {
        // Handle the case where the user or user.cart is not available
        return generateErrorMessage(404, "Cart not found");
    }

}

export default{
    getCart,
    addItemToCart,
    deleteItem
}