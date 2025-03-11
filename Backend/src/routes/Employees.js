import express from "express";
import EmployeesController from "../controllers/EmployeesController.js";

const router = express.Router();

router.route("/").get(EmployeesController.getEmployees)
.post(EmployeesController.insertEmployees)

router.route("/:id")
.put(EmployeesController.updateEmployees)
.delete(EmployeesController.deleteEmployees);

export default router;