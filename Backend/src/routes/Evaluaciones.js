import express from "express";
import EvaluacionesController from "../controllers/EvaluacionesController.js";
const router = express.Router();

router.route("/")
.get(EvaluacionesController.getEvaluaciones)
.post(EvaluacionesController.insertEvaluaciones)

router.route("/:id")
.put(EvaluacionesController.updateEvaluaciones)
.delete(EvaluacionesController.deleteEvaluaciones)

export default router