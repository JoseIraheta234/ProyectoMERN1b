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

passwordRecoveryController.verifyCode = async (req, res) => {
    
    const  {code} = req.body;

    try {
        const token = req.cookies.tokenRecoveryCode;

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        if (decoded.code !== code) {
            return res.json({message: "Invalid code"});
        }

        const newToken = jsonwebtoken.sign(
            {email: decoded.email, code: decoded.code, userType: decoded.userType, verified: true},
            config.JWT.secret,
            {expiresIn: "25m"}
        )

        res.cookie("tokenRecoveryCode", newToken, {maxAge: 25 * 60 * 1000})
        res.json({message: "Code verified"})
    } catch (error) {
        console.log("error" + error);
    }
}

export default passwordRecoveryController;