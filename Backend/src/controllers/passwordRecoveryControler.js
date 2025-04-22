import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

import clientsModel from "../models/Clients.js";
import employeesModel from "../models/employees.js";

import { config } from "../config.js";
import { sendEmail, HTMLRecoveryEmail } from "../utils/mailPasswordRecovery.js";

const passwordRecoveryController = {};

passwordRecoveryController.requestCode = async (req, res) => {
    const {email} = req.body;

    try {
        let userFound;
        let userType; 

        userFound = await  clientsModel.findOne({ email}); 
        if(userFound) {
            userType = "client";
        }else {
            userFound = await employeesModel.findOne({email});
            userType = "employee";
        }

        if(!userFound){
            return res.json({message: "User not found"});
        }

        const code = Math.floor(100000 + Math.random() * 60000).toString(); // Generate a 6-digit code


        //Token

        const token = jsonwebtoken.sign(
           {email, code, userType, verified: false},
           config.JWT.secret,
              {expiresIn: "25m"}
        )
        
        res.cookie("tokenRecoveryCode", token, {maxAge: 25 * 60 * 1000})

        await sendEmail(
            email,
            "Password Recovery",
            `your verification code is ${code}`,
            HTMLRecoveryEmail(code)
        )

        res.json({message: "verification code sent"})

    } catch (error) {
        console.log("error" + error);
    }
}