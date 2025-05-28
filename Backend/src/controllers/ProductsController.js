const ProductsController = {};
import productsModel from "../models/Products.js";

// GET - Obtener todos los productos
ProductsController.getProducts = async (req, res) => {
    try {
        const products = await productsModel.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ 
            message: "Error al obtener productos", 
            error: error.message 
        });
    }
};

// POST - Crear nuevo producto
ProductsController.insertProducts = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        
        // Validación básica
        if (!name || !price || stock === undefined) {
            return res.status(400).json({ 
                message: "Faltan campos requeridos (name, price, stock)" 
            });
        }

        if (price < 0 || stock < 0) {
            return res.status(400).json({ 
                message: "El precio y stock deben ser mayores o iguales a 0" 
            });
        }

        const newProduct = new productsModel({
            name: name.trim(),
            description: description ? description.trim() : '',
            price: parseFloat(price),
            stock: parseInt(stock)
        });

        const savedProduct = await newProduct.save();
        
        res.status(201).json({
            message: "Producto creado exitosamente",
            product: savedProduct
        });
    } catch (error) {
        console.error('Error al crear producto:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: "Error de validación", 
                error: error.message 
            });
        }
        
        res.status(500).json({ 
            message: "Error al crear producto", 
            error: error.message 
        });
    }
};

// DELETE - Eliminar producto
ProductsController.deleteProducts = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedProduct = await productsModel.findByIdAndDelete(id);
        
        if (!deletedProduct) {
            return res.status(404).json({ 
                message: "Producto no encontrado" 
            });
        }
        
        res.status(200).json({
            message: "Producto eliminado exitosamente",
            product: deletedProduct
        });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({ 
                message: "ID de producto inválido" 
            });
        }
        
        res.status(500).json({ 
            message: "Error al eliminar producto", 
            error: error.message 
        });
    }
};

// PUT - Actualizar producto
ProductsController.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock } = req.body;
        
        // Validación básica
        if (!name || !price || stock === undefined) {
            return res.status(400).json({ 
                message: "Faltan campos requeridos (name, price, stock)" 
            });
        }

        if (price < 0 || stock < 0) {
            return res.status(400).json({ 
                message: "El precio y stock deben ser mayores o iguales a 0" 
            });
        }

        const updateData = {
            name: name.trim(),
            description: description ? description.trim() : '',
            price: parseFloat(price),
            stock: parseInt(stock)
        };

        const updatedProduct = await productsModel.findByIdAndUpdate(
            id, 
            updateData, 
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ 
                message: "Producto no encontrado" 
            });
        }

        res.status(200).json({
            message: "Producto actualizado exitosamente",
            product: updatedProduct
        });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({ 
                message: "ID de producto inválido" 
            });
        }
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: "Error de validación", 
                error: error.message 
            });
        }
        
        res.status(500).json({ 
            message: "Error al actualizar producto", 
            error: error.message 
        });
    }
};

export default ProductsController;