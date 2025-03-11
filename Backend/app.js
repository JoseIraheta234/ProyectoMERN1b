import express from "express";
import productsRoutes from "./src/routes/Products.js"
import ClientsRoutes from "./src/routes/Clients.js"
import EmployeesRoutes from "./src/routes/Employees.js";
import SucursalesRoutes from "./src/routes/sucursales.js";

const app = express();

app.use(express.json())

app.use("/api/Products", productsRoutes)
app.use("/api/Clients", ClientsRoutes)
app.use("/api/Employees", EmployeesRoutes)
app.use("/api/Sucursales",SucursalesRoutes )

export default app;


