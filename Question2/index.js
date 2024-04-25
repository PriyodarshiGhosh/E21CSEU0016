import express from "express";
import topProductsController from './controller/topProductsController.js';
const app=express();
app.use(express.json())
app.use('/products', topProductsController);
app.listen(3000,()=>{
    console.log("listening at 3000")
})
