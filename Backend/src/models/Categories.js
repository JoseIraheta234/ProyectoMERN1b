import {Schema, model} from "mongoose";

const CategoriesShema = new Schema({

    name: {
        type: String,
        require: true,
        maxLength: 100
    },
    description: {
        type: String
    },
    status: {
        type: String
    },
    image: {
        type: String
    }
},{
    timestamps: true,
    strict: false
})


export default model("Categories", CategoriesShema)