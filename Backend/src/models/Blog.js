import {Schema, model} from "mongoose";

const BlogShema = new Schema({

    title: {
        type: String
    },
    content: {
        type: String
    },
    image: {
        type: String
    }
},{
    timestamps: true,
    strict: false
})


export default model("blog", BlogShema)