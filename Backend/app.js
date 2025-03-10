import express from "express";
import productsRoutes from "./src/routes/Products.js"

const app = express();

app.use(express.json())

app.use("/api/Products", productsRoutes)

export default app;


