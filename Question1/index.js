import express from "express";
import mongoose from "mongoose";
import { registerouter } from "../controller/register.js";
import { loginrouter } from "../controller/login.js";
const app=express();
app.use(express.json())
app.use("/",registerouter)
app.use("/",loginrouter)
mongoose.connect("mongodb+srv://aryan12:priyo1818@cluster0.5krm9bs.mongodb.net/")
app.listen(3001,()=>{
    console.log("listening at 3001")
})
