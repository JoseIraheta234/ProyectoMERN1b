const ProductsController = {};
import productsModel from "../models/Products.js";


//select

ProductsController.getProducts = async (req, res) => {
    const products = await productsModel.find()
    res.json(products)
}


//insert



