const EvaluacionesController = {};
import EvaluacionesModel from "../models/Evaluaciones.js"

// Select 
EvaluacionesController.getEvaluaciones = async (req, res) => {
    const Evaluaciones = await EvaluacionesModel.find().populate("idEmpleado")
    res.json(Evaluaciones)
};

//insert

EvaluacionesController.insertEvaluaciones = async (req, res) => {
    const {comment,grade,role,idEmpleado} = req.body;
    const newEvaluaciones = new EvaluacionesModel({comment,grade,role,idEmpleado})

    await newEvaluaciones.save()
    res.json({message: "Evaluaciones saved"});
};

//delete 
EvaluacionesController.deleteEvaluaciones = async (req, res) => {
    await EvaluacionesModel.findByIdAndDelete(req.params.id);
    res.json({message: "Evaluaciones Deleted"})
}; 

//update 

EvaluacionesController.updateEvaluaciones = async (req, res) => {
    const {comment,grade,role,idEmpleado} = req.body;
    const updatedEvaluaciones = await EvaluacionesModel.findByIdAndUpdate(req.params.id, {comment,grade,role,idEmpleado} , {new: true} )

    res.json({message: "Updated Evaluaciones"})
};


export default EvaluacionesController;