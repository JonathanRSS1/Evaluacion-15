import express from "express";
import cors from "cors";  // <-- Importar cors
import employeeRoutes from "./src/routes/employees.js";
import branchesRoutes from "./src/routes/branches.js";
import registerEmployessRoutes from "./src/routes/registerEmployees.js";
import cookieParser from "cookie-parser";
import providersRoutes from "./src/routes/providers.js";

const app = express();

// Configurar cors para que acepte peticiones desde el frontend (localhost:5173)
app.use(cors({
  origin: "http://localhost:5173",  // URL donde corre tu frontend React
  credentials: true,                 // Permitir cookies y credenciales si las usas
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/employee", employeeRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/registerEmployees", registerEmployessRoutes);
app.use("/api/providers", providersRoutes);

export default app;
