import express from "express";
import CategoriesController from "../controllers/CategoriesController.js";

const router = express.Router();

router.route("/").get(CategoriesController.getCategories)
.post(CategoriesController.insertCategories)

router.route("/:id")
.put(CategoriesController.updateCategories)
.delete(CategoriesController.deleteCategories);

export default router;