import branchesModel from "../models/branches.js";

const branchesController = {};

// SELECT - Obtener todas las sucursales
branchesController.getbranches = async (req, res) => {
  try {
    const branches = await branchesModel.find();
    res.json(branches);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener sucursales" });
  }
};

// INSERT - Crear una nueva sucursal
branchesController.createbranches = async (req, res) => {
  try {
    const { name, address, birthday, schedule, telephone } = req.body;
    const newBranch = new branchesModel({ name, address, birthday, schedule, telephone });
    await newBranch.save();
    res.json({ message: "Sucursal guardada" });
  } catch (error) {
    res.status(500).json({ message: "Error al guardar sucursal" });
  }
};

// UPDATE - Actualizar sucursal
branchesController.updatebranches = async (req, res) => {
  try {
    const { name, address, birthday, schedule, telephone } = req.body;
    const updatedBranch = await branchesModel.findByIdAndUpdate(
      req.params.id,
      { name, address, birthday, schedule, telephone },
      { new: true }
    );
    if (!updatedBranch) return res.status(404).json({ message: "Sucursal no encontrada" });
    res.json({ message: "Sucursal actualizada" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar sucursal" });
  }
};

// DELETE - Eliminar sucursal
branchesController.deletebranches = async (req, res) => {
  try {
    const deletedBranch = await branchesModel.findByIdAndDelete(req.params.id);
    if (!deletedBranch) return res.status(404).json({ message: "Sucursal no encontrada" });
    res.json({ message: "Sucursal eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar sucursal" });
  }
};

export default branchesController;
