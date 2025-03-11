import {Schema, model} from "mongoose";

const EmployeesShema = new Schema({

    name: {
        type: String,
        require: true,
        maxLength: 100
    },
    lastname: {
        type: String,
        require: true,
        maxLength: 100
    },
    birthday: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    hireDate: {
        type: String
    },
    password: {
        type: String
    },
    telephone: {
        type: String
    },
    dui: {
        type: String
    },
    isssNumber: {
        type: String
    },
    isVerified: {
        type: Boolean
    }
},{
    timestamps: true,
    strict: false
})


export default model("employees", EmployeesShema)