import {Schema, model} from "mongoose";

const FaqsShema = new Schema({

    question: {
        type: String,
        required: true,
        minLength: 4,
        trim: true
    },
    answer: {
        type: String,
        required: true,
        minLength: 4,
        trim: true
        
    },
    level: {
        type: Number,
        require: true,
        min: 0,
        max: 5,
        trim: true
    },
    isActive: {
        type: Boolean,
        require: true
    }
},{
    timestamps: true,
    strict: false
})


export default model("Faqs", FaqsShema)