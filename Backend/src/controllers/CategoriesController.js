const CategoriesController = {};
import CategoriesModel from "../models/Categories.js";


//select

CategoriesController.getCategories = async (req, res) => {
    const Categories = await CategoriesModel.find()
    res.json(Categories)
};


//insert

CategoriesController.insertCategories = async (req, res) => {
    const {name, description, status, image} = req.body;
    const newCategories = new CategoriesModel({name, description, status, image})

    await newCategories.save()
    res.json({message: "Product saved"});
};


//delete 

CategoriesController.deleteCategories = async (req, res) => {
    await CategoriesModel.findByIdAndDelete(req.params.id);
    res.json({message: "Products Deleted"})
}; 


//update

CategoriesController.updateCategories = async (req, res) => {
    const {name, description, status, image} = req.body;
    const updatedCategories = await CategoriesModel.findByIdAndUpdate(req.params.id, {name, description, status, image} , {new: true} )

    res.json({message: "Updated Product"})
};


export default CategoriesController;