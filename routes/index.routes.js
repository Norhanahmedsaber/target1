import { globalError } from "../middleware/globalError.js"
import { AppError } from "../utils/AppError.js"
import  router from "../routes/client.js"

export const apiRoutes =(app)=>{


    app.use(router)

    //------------------------------
    app.use('*',(req,res,next)=>{
        next(new AppError("Page Not Found "+req.originalUrl,404))
    })
    app.use(globalError)
}