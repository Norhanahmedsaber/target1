import express from "express"
// import client from "../controllers/client.js"
import Client from "../Models/Client.js"
const router= new express.Router()

router.post('/signup',async(req,res)=>{
    let payload ={
        fullName:req.body,fullName,
        email:req.body.email,
        password:req.body.password
    }
    const result  = await Client.create(payload)
    // const result = await client.signUp(payload)
    if(!result){
        console.log("error")
        res.sendStatus(500)
    }
    res.send(req.body)
})

router.post('/signin',async(req,res)=>{
    console.log(req.body)
    res.send(req.body)
})
export default router