import express from "express";
import providersController from "../controllers/providersController.js";
import multer from "multer";

const router = express.Router();

// Configurar carpeta temporal para multer
const upload = multer({ dest: "public/" });

// CRUD completo con imagen
router
  .route("/")
  .get(providersController.getAllProviders)
  .post(upload.single("image"), providersController.insertProviders);

router
  .route("/:id")
  .put(upload.single("image"), providersController.updateProvider)
  .delete(providersController.deleteProvider) // <- ¡Agrega esta ruta si no la tenías!
  //.get(providersController.getProviderById); // <-- opcional si quieres ver uno solo

export default router;
