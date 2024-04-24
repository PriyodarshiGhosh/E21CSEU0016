import express from "express";
import { UserModel } from "../models/user.js";
const router=express.Router();
router.post("/login",async(req,res)=>{
    const {name,password}=req.body;
    try{
        const check=await UserModel.find({name,password});
        if(check.length>0){
            console.log(check.length)
            res.json("success");
        }
        else{
            console.log(check)
            res.json("wrong username or password");
        }
    }catch(error){
        console.log("hello")
        res.json(error);
    }
})
export {router as loginrouter};