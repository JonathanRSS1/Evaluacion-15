import React, { useEffect, useState } from "react";
import axios from "axios";

const TablaProveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    telephone: "",
    image: null,
  });
  const [mostrarInputImagen, setMostrarInputImagen] = useState(false);

  // Obtener proveedores al cargar
  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/providers");
      setProveedores(res.data);
    } catch (error) {
      console.error("Error al obtener proveedores:", error);
    }
  };

  // Abrir modal editar y cargar datos
  const abrirModalEditar = (prov) => {
    setProveedorSeleccionado(prov);
    setFormData({
      name: prov.name,
      telephone: prov.telephone,
      image: null, // no cambiar hasta que el usuario suba nueva
    });
    setMostrarInputImagen(false);
    setModalEditarVisible(true);
  };

  // Abrir modal eliminar
  const abrirModalEliminar = (prov) => {
    setProveedorSeleccionado(prov);
    setModalEliminarVisible(true);
  };

  // Manejar submit editar
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("telephone", formData.telephone);
      if (formData.image) data.append("image", formData.image);

      await axios.put(
        `http://localhost:4000/api/providers/${proveedorSeleccionado._id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setModalEditarVisible(false);
      setProveedorSeleccionado(null);
      setFormData({ name: "", telephone: "", image: null });
      setMostrarInputImagen(false);
      fetchProveedores();
    } catch (error) {
      console.error("Error al actualizar proveedor:", error);
    }
  };

  // Eliminar proveedor
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:4000/api/providers/${proveedorSeleccionado._id}`
      );
      setModalEliminarVisible(false);
      setProveedorSeleccionado(null);
      fetchProveedores();
    } catch (error) {
      console.error("Error al eliminar proveedor:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tabla de Proveedores</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500 border border-gray-200">
          <thead className="text-xs text-white uppercase bg-gray-800">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Teléfono</th>
              <th className="px-4 py-2">Imagen</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((prov) => (
              <tr
                key={prov._id}
                className="bg-white border-b hover:bg-gray-100"
              >
                <td className="px-4 py-2">{prov.name}</td>
                <td className="px-4 py-2">{prov.telephone}</td>
                <td className="px-4 py-2">
                  {prov.image && (
                    <img
                      src={prov.image}
                      alt={prov.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => abrirModalEditar(prov)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => abrirModalEliminar(prov)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Editar */}
      {modalEditarVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl mb-4">Editar Proveedor</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nombre"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full mb-2 border rounded px-2 py-1"
                required
              />
              <input
                type="text"
                placeholder="Teléfono"
                value={formData.telephone}
                onChange={(e) =>
                  setFormData({ ...formData, telephone: e.target.value })
                }
                className="w-full mb-2 border rounded px-2 py-1"
                required
              />

              {/* Previsualización imagen actual si existe */}
              {proveedorSeleccionado.image && !mostrarInputImagen && (
                <div className="mb-2">
                  <img
                    src={proveedorSeleccionado.image}
                    alt="Imagen actual"
                    className="w-32 h-32 object-cover rounded mb-2"
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarInputImagen(true)}
                    className="text-blue-600 underline"
                  >
                    Cambiar imagen
                  </button>
                </div>
              )}

              {/* Input para cambiar imagen solo si se clickeó "Cambiar imagen" */}
              {mostrarInputImagen && (
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                  className="w-full mb-4"
                  accept="image/*"
                />
              )}

              {/* Si no hay imagen previa, siempre mostrar input */}
              {!proveedorSeleccionado.image && (
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                  className="w-full mb-4"
                  accept="image/*"
                />
              )}

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalEditarVisible(false);
                    setMostrarInputImagen(false);
                    setProveedorSeleccionado(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Eliminar */}
      {modalEliminarVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-xl mb-4">Confirmar eliminación</h2>
            <p>
              ¿Estás seguro que deseas eliminar el proveedor{" "}
              <strong>{proveedorSeleccionado?.name}</strong>?
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setModalEliminarVisible(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablaProveedores;

