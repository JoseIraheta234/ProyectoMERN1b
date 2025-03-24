import express from "express";
import productsRoutes from "./src/routes/Products.js"
import ClientsRoutes from "./src/routes/Clients.js"
import EmployeesRoutes from "./src/routes/Employees.js";
import SucursalesRoutes from "./src/routes/sucursales.js";
import CategoriesRoutes from "./src/routes/Categories.js";
import ReviewsRoutes from "./src/routes/reviews.js";
import EvaluacionesRoutes from "./src/routes/Evaluaciones.js";
import RegisterEmployeesRoutes from "./src/routes/registerEmployees.js"
import LoginRoutes from "./src/routes/login.js"

const app = express();

app.use(express.json())

app.use("/api/Products", productsRoutes)
app.use("/api/Clients", ClientsRoutes)
app.use("/api/Employees", EmployeesRoutes)
app.use("/api/Sucursales",SucursalesRoutes )
app.use("/api/Categories", CategoriesRoutes )
app.use("/api/reviews", ReviewsRoutes)
app.use("/api/Evaluaciones", EvaluacionesRoutes)
app.use("/api/registerEmployees", RegisterEmployeesRoutes)
app.use("/api/login", LoginRoutes)

export default app;


