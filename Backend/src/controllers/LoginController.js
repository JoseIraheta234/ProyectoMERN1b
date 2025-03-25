import ClientsModel from "../models/Clients.js"
import EmployeesModel from "../models/employees.js"
import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { config} from "../config.js"

const loginController = {};

loginController.login = async (req,res) => {

    const{email, password} = req.body;
    try{
        let userFound;
        let userType;
        if(email === config.emailAdmin.email && password === config.emailAdmin.password){
            userType = "Admin"; 
            userFound = {_id: "Admin"}
        } else {

            userFound = await EmployeesModel.findOne({email});
            userType = "Employee";

            if(!userFound){
                userFound = await ClientsModel.findOne({email});
                userType = "Client";
            }
        }

        if(!userFound){
            return res.json({message: "User not found"})
        }

        if(userType !== "Admin"){
            const isMatch = bcryptjs.compare(password, userFound.password);
            if(!isMatch){
                return res.json({message: "Invalid password"})
            }
        }

        jsonwebtoken.sign(

            {id: userFound._id, userType},
            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},
            (error, token) => {
                if(error)console.log(error);
                res.cookie("authToken", token);
                res.json({message: "Login Successful"})
            }
        )

    }
    catch(error) {
        console.log(error)
    }
}

export default loginController;
