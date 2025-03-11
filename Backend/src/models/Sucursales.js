import {Schema,model} from "mongoose";
 
const sucursalesShema = new Schema({
    name: {
        type: String,
        require: true,
        maxLength:100
    },
 
    address:{
        type:String
    },
 
    telephone:{
        type:String
    },
 
    schedule:{
        type:String
    }
},{
    timestamps : true,
    strict:false
})
 
export default model("Sucursales",sucursalesShema)