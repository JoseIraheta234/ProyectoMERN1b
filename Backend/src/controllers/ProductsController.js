const ProductsController = {};
import productsModel from "../models/Products.js";


//select

ProductsController.getProducts = async (req, res) => {
    const products = await productsModel.find()
    res.json(products)
};


//insert

ProductsController.insertProducts = async (req, res) => {
    const {name, description, price, stock} = req.body;
    const newProduct = new productsModel({name, description, price, stock})

    await newProduct.save()
    res.json({message: "Product saved"});
};


//delete 

ProductsController.deleteProducts = async (req, res) => {
    await productsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Products Deleted"})
}; 


//update

ProductsController.updateProduct = async (req, res) => {
    const {name, description, price, stock} = req.body;
    const updatedProduct = await productsModel.findByIdAndUpdate(req.params.id, {name, description, price, stock} , {new: true} )

    res.json({message: "Updated Product"})
};


export default ProductsController;



