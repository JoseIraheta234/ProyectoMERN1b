import express from "express";
import sucursalesController from "../controllers/sucursalesController.js";
const router = express.Router();
 
router.route("/").get(sucursalesController.getSucursales)
.post(sucursalesController.insertSucursales)
 
router.route("/:id")
.put(sucursalesController.updateSucursales)
.delete(sucursalesController.deleteSucursales)
 
export default router;