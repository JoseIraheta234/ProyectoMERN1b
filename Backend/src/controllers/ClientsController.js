const clientsController = {};
import clientsModel from "../models/Clients.js";


//select

clientsController.getClients = async (req, res) => {
    const clients = await clientsModel.find()
    res.json(clients)
};


//insert

clientsController.insertClients = async (req, res) => {
    const {name, lastname, birthday, email,password,telephone,dui,isVerified} = req.body;
    const newProduct = new clientsModel({name, lastname, birthday, email,password,telephone,dui,isVerified})

    await newProduct.save()
    res.json({message: "Clients saved"});
};


//delete 

clientsController.deleteClients = async (req, res) => {
    await clientsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Clients Deleted"})
}; 


//update

clientsController.updateClients = async (req, res) => {
    const {name, lastname, birthday, email,password,telephone,dui,isVerified} = req.body;
    const updatedClients = await clientsModel.findByIdAndUpdate(req.params.id, {name, lastname, birthday, email,password,telephone,dui,isVerified} , {new: true} )

    res.json({message: "Updated Clients"})
};


export default clientsController;