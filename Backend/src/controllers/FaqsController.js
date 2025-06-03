const FaqsController = {};
import FaqsModel from "../models/Faqs.js";

// GET - Obtener todos los productos
FaqsController.getFaqs = async (req, res) => {
    try {
        const Faqs = await FaqsModel.find().sort({ createdAt: -1 });
        res.status(200).json(Faqs);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ 
            message: "Error al obtener productos", 
            error: error.message 
        });
    }
};

// POST - Crear nuevo producto
FaqsController.insertFaqs = async (req, res) => {
    try {
        const { question, answer, level, isActive } = req.body;
        
        if(level < 1 || level > 5) {
            return res.status(400).json({message: "El nivel debe estar entre 1 y 5"});
        }

        if (!question || !answer || !level  || !isActive ) {
            return res.status(400).json({ 
                message: "Ingrese los datos Correctos)" 
            });
        }

        if (question.length < 4 || answer.length < 4) {
            return res.status(400).json({ 
                message: "La pregunta y la respuesta deben tener al menos 4 caracteres" 
            });
        }

        const newFaqs = new FaqsModel({
            question, answer, level, isActive
        });

        const savedFaqs = await newFaqs.save();
        
        res.status(201).json({
            message: "Faq creado exitosamente",
            product: savedFaqs
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
FaqsController.deleteFaqs = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedFaqs = await FaqsModel.findByIdAndDelete(id);
        
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
FaqsController.updateFaqs = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer, level, isActive } = req.body;
        
        // Validación básica
        if (!question || !answer || !level || !isActive) {
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
            question, answer, level, isActive
        };

        const updatedProduct = await FaqsModel.findByIdAndUpdate(
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

export default FaqsController;