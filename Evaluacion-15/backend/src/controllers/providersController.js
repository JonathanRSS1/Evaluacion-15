import providerModel from "../models/providers.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";

// Configurar Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

const providersController = {};

// Obtener todos los proveedores
providersController.getAllProviders = async (req, res) => {
  try {
    const providers = await providerModel.find();
    res.json(providers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener proveedores" });
  }
};

// Insertar nuevo proveedor
providersController.insertProviders = async (req, res) => {
  try {
    const { name, telephone } = req.body;
    let imageURL = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "public",
        allowed_formats: ["png", "jpg", "jpeg"],
      });
      imageURL = result.secure_url;
    }

    const newProvider = new providerModel({ name, telephone, image: imageURL });
    await newProvider.save();

    res.json({ message: "Proveedor guardado", provider: newProvider });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al guardar proveedor" });
  }
};

// Actualizar proveedor
providersController.updateProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, telephone } = req.body;

    let imageURL;

    // Si hay nueva imagen, subirla
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "public",
        allowed_formats: ["png", "jpg", "jpeg"],
      });
      imageURL = result.secure_url;
    }

    const updateData = { name, telephone };
    if (imageURL) updateData.image = imageURL;

    const updatedProvider = await providerModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProvider) return res.status(404).json({ message: "Proveedor no encontrado" });

    res.json({ message: "Proveedor actualizado", provider: updatedProvider });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar proveedor" });
  }
};

// ✅ Eliminar proveedor
providersController.deleteProvider = async (req, res) => {
  try {
    const { id } = req.params;

    const provider = await providerModel.findById(id);
    if (!provider) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    // Si hay imagen, podrías eliminarla de Cloudinary también
    // Opcional: si guardas el public_id, puedes usar:
    // await cloudinary.uploader.destroy(publicId);

    await providerModel.findByIdAndDelete(id);
    res.json({ message: "Proveedor eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar proveedor" });
  }
};

export default providersController;
