import express from "express";
import { UserModel } from "../models/user.js";
const router=express.Router();
router.post("/register",async(req,res)=>{

    const {name,password,country}=req.body;
    console.log(name)
     const newUser=new UserModel({name,password,country})
     console.log(newUser)
    try{
    const check=await UserModel.find({name})
    if(check){
        console.log("hi")
        res.json("user by this name exists");
    }
     const response=await newUser.save()
     console.log("success")
     res.json("succesfully registered")
    }catch(err){
        console.log("entered catch")
        res.json(err);
    }

})
export {router as registerouter};