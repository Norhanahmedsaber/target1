import express from "express"
import client from "../controllers/client.js"
const router = new express.Router()

router.post('/signup',async(req,res)=>{
    let payload ={
        fullName:req.body.fullName,
        email:req.body.email,
        password:req.body.password
    }
    const result =await client.signUp(payload)
    if(!result){
        console.log("error")
        res.sendStatus(404)
    }
    res.send(req.body)
})


router.post('/signin',async(req,res)=>{
   const payload ={
        fullName:req.body.fullName,
        email:req.body.email,
        password:req.body.password
    }
    const result = await client.sigin(payload)
    if(!result){
        console.log("error")
        res.sendStatus(404)
    }
    res.send(result)
})
export default router