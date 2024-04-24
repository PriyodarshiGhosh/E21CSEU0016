import mongoose from "mongoose";

const UserSchema=mongoose.Schema({
    name:{
        type:String
    },
    password:{
        type:String
    },
    country:{
        type:String
    }
})
export const UserModel=mongoose.model("user",UserSchema);