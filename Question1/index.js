import express from "express";
import { getNumbers } from "./controller/averageController.js";
const app=express();
app.use(express.json());
app.get('/numbers/:numberid', getNumbers);
app.listen(9876,()=>{
    console.log("listening at 9876")
})
