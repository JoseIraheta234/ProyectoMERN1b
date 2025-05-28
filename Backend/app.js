import express from "express";
import cors from "cors"; // Necesitas instalar: npm install cors
import productsRoutes from "./src/routes/Products.js"
import ClientsRoutes from "./src/routes/Clients.js"
import EmployeesRoutes from "./src/routes/Employees.js";
import SucursalesRoutes from "./src/routes/sucursales.js";
import CategoriesRoutes from "./src/routes/Categories.js";
import ReviewsRoutes from "./src/routes/reviews.js";
import EvaluacionesRoutes from "./src/routes/Evaluaciones.js";
import RegisterEmployeesRoutes from "./src/routes/registerEmployees.js"
import LoginRoutes from "./src/routes/login.js"
import cookieParser from "cookie-parser";
import LogOutRoutes from "./src/routes/LogOut.js"
import RegisterClientsRoutes from "./src/routes/registerClients.js"
import PasswordRecoveryRoutes from "./src/routes/passwordRecovery.js"
import BlogRoutes from "./src/routes/Blog.js"

const app = express();

// Configuración de CORS
app.use(cors({
  origin: ['http://localhost:4000', 'http://localhost:5173'], // Puertos comunes de React/Vite
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/api/Products", productsRoutes);
app.use("/api/Clients", ClientsRoutes);
app.use("/api/Employees", EmployeesRoutes);
app.use("/api/Sucursales", SucursalesRoutes);
app.use("/api/Categories", CategoriesRoutes);
app.use("/api/reviews", ReviewsRoutes);
app.use("/api/Evaluaciones", EvaluacionesRoutes);
app.use("/api/registerEmployees", RegisterEmployeesRoutes);
app.use("/api/login", LoginRoutes);
app.use("/api/logout", LogOutRoutes);
app.use("/api/registerClients", RegisterClientsRoutes);
app.use("/api/passwordRecovery", PasswordRecoveryRoutes);
app.use("/api/Blog", BlogRoutes);

// Middleware de manejo de errores
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ 
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'production' ? {} : error.message 
  });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

export default app;