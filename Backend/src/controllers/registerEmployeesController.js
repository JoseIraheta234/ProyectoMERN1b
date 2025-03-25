const registerEmployeesController = {};

import employee from "../models/employees.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

registerEmployeesController.register = async (req,res) => {
    const {name, lastname, birthday, email,address,hireDate,password,telephone,dui,isssNumber,isVerified} = req.body;

    try {
        const existEmployee = await employee.findOne({email});
        if(existEmployee){
            return res.json({message: "Employee already exist"});
        }

        //hashear o encriptar la contraseña 
        const passwordHash = await bcryptjs.hash(password, 10);

        const newEmployee = new employee({name, lastname, birthday, email,address,hireDate,password: passwordHash ,telephone,dui,isssNumber,isVerified})
        await newEmployee.save();

        //generar un token que valide que ya esta registrado
        //y se puede acceder a todas las paginas

        jsonwebtoken.sign(
            {id: newEmployee._id},
            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},

            (error, token) => {
                if(error)console.log(error);
                res.cookie("authToken", token);
                res.json({message:"Empleado Registrado"})
            }
        );
    } 
    catch (error) {
        console.log(error);
        res.json({message: "Error al registrar al empleado"})
    }
}

export default registerEmployeesController;

