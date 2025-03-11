const EmployeesController = {};
import employeesModel from "../models/employees.js";


//select

EmployeesController.getEmployees = async (req, res) => {
    const employees = await employeesModel.find()
    res.json(employees)
};


//insert

EmployeesController.insertEmployees = async (req, res) => {
    const {name, lastname, birthday, email,address,hireDate,password,telephone,dui,isssNumber,isVerified} = req.body;
    const newProduct = new employeesModel({name, lastname, birthday, email,address,hireDate,password,telephone,dui,isssNumber,isVerified})

    await newProduct.save()
    res.json({message: "employees saved"});
};


//delete 

EmployeesController.deleteEmployees = async (req, res) => {
    await employeesModel.findByIdAndDelete(req.params.id);
    res.json({message: "employees Deleted"})
}; 


//update

EmployeesController.updateEmployees = async (req, res) => {
    const {name, lastname, birthday, email,password,telephone,dui,isVerified} = req.body;
    const updatedEmployees = await employeesModel.findByIdAndUpdate(req.params.id, {name, lastname, birthday, email,address,hireDate,password,telephone,dui,isssNumber,isVerified} , {new: true} )

    res.json({message: "Updated employees"})
};


export default EmployeesController;