import {Schema, model} from "mongoose";

const EvaluacionesShema = new Schema({

    comment: {
        type: String,
        require: true
    },
    grade: {
        type: Number,
        require : true,
        max : 10,
        min : 0
    },
    role: {
        type : String,
        require: true
    },
    idEmpleado: {
        type: Schema.Types.ObjectId,
        ref: "employees",
        require: true
    }
},{
    timestamps: true,
    strict: false
})


export default model("Evaluaciones", EvaluacionesShema)