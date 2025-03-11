const sucursalesController = {};
 
import sucursalesModel from "../models/Sucursales.js";
 
//Select
 
sucursalesController.getSucursales = async (req,res) => {
  const sucursales = await sucursalesModel.find()
  res.json(sucursales)
 
};
 
//Insert
 
sucursalesController.insertSucursales = async (req,res) =>{
    const{name,address,telephone,schedule} = req.body;
    const newSucursales = new sucursalesModel({ name,address,telephone,schedule })
    await newSucursales.save()
    res.json({message: "sucursales saved"})
};
 
//Delete
 
sucursalesController.deleteSucursales = async(req,res) =>{
    await sucursalesModel.findByIdAndDelete(req.params.id);
    res.json({message: "sucursales deleted"})
};
 
//Update
 
sucursalesController.updateSucursales = async(req,res) =>{
    const {name,address,telephone,schedule} = req.body;
    const updateClient = await sucursalesModel.findByIdAndUpdate(req.params.id,{name,address,telephone,schedule},{new: true})
    res.json({message: "sucursales updated"})
 
}
 
export default sucursalesController;