import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import cryto from "crypto";
import clientsModel from "../models/Clients.js";
import {config} from "../config.js";

const registerClientsController = {};

registerClientsController.register = async (req, res) => {
    const {name, lastname, birthday, email,password,telephone,dui,isVerified} = req.body;

    try {
        const ClientExist = await clientsModel.findOne({email});
        if (ClientExist) {
            return res.json({message: "Client already exists"});
        }

        const passwordHash = await bcryptjs.hash(password, 10);

        const newClient = new clientsModel({name, lastname, birthday, email,password:passwordHash,telephone,dui: dui|| null,isVerified: isVerified || false});

        await newClient.save();

        const vericationCode = cryto.randomBytes(3).toString("hex");

        const token = jsonwebtoken.sign({email, vericationCode}, config.JWT.secret, {expiresIn: "2h"});

        res.cookie("verificationToken", token, {maxAge: 2*60*60*1000})

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.email_user ,
                pass: config.email.email_pass
            }
        }); 

        const mailOptions = {
            from : config.email.email_user,
            to: email,
            subject: "Verificacion de correo ",
            text: `Para verificar tu correo, utiliza el siguente Codigo: ${vericationCode}\n El siguente Codigo vence en 2 horas`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error) return res.json({message: "Error al enviar el correo de verificacion"});

            console.log("Correo Enviado")
        })

        res.json({message: "Client registered. Please verify your email with the code sent to your email."});

    } catch (error) {
        
    }

   
    }
    registerClientsController.verifyCodeEmail = async (req, res) => {

        const {vericationCode} = req.body;
        const token = req.cookies.verificationToken;

        try {
            const decoded = jsonwebtoken.verify(token, config.JWT.secret);
            const {email, vericationCode: storedCode} = decoded;

            if (vericationCode !== storedCode) {
                return res.json({message: "Invalid verification code"});
            }

            const client = await clientsModel.findOne({email});
            client.isVerified = true;
            await client.save();

            res.json({message: "Email verified successfully"});
            res.clearCookie("verificationToken");
        } catch (error) {
            res.json({message: "error"})
        }   
};

export default registerClientsController;