import { globalError } from "../middleware/globalError.js"
import { AppError } from "../utils/AppError.js"
import  router from "../routes/client.js"
import cartRouter from './cart.js'
export const apiRoutes =(app)=>{


    app.use(router)
    app.use(cartRouter)

    //------------------------------
    app.use('*',(req,res,next)=>{
        next(new AppError("Page Not Found "+req.originalUrl,404))
    })
    app.use(globalError)
}