import express from "express";
import providersController from "../controllers/providersController.js";
import multer from "multer";

const router = express.Router();

// Configurar carpeta temporal para multer
const upload = multer({ dest: "public/" });

router.route("/")
  .get(providersController.getAllProviders)
  .post(upload.single("image"), providersController.insertProviders);

// Ruta PUT para actualizar proveedor, imagen opcional
router.put("/:id", upload.single("image"), providersController.updateProvider);

export default router;
