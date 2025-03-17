import {Schema, model} from "mongoose";

const ReviewsShema = new Schema({

    comment: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        require : true,
        max : 5,
        min : 0
    },
    idClient: {
        type: Schema.Types.ObjectId,
        ref: "clients",
        require: true
    }
},{
    timestamps: true,
    strict: false
})


export default model("Reviews", ReviewsShema)