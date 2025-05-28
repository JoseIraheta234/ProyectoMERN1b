import express from "express";
import ProductsController from "../controllers/ProductsController.js";

const router = express.Router();

router.route("/").get(ProductsController.getProducts)
.post(ProductsController.insertProducts)

router.route("/:id")
.put(ProductsController.updateProduct)
.delete(ProductsController.deleteProducts);

export default router;