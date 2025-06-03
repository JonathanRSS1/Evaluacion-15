import React, { useEffect, useState } from "react";

const TablaSucursales = () => {
  const [sucursales, setSucursales] = useState([]);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    birthday: "",
    schedule: "",
    telephone: "",
  });

  useEffect(() => {
    obtenerSucursales();
  }, []);

  const obtenerSucursales = async () => {
  try {
    const res = await fetch("http://localhost:4000/api/branches");
    if (!res.ok) throw new Error("Error al obtener sucursales");
    const data = await res.json();
    console.log("Sucursales recibidas:", data);  // <-- aquí
    setSucursales(data);
  } catch (error) {
    console.error("Error:", error);
  }
};


  const abrirModalEditar = (sucursal) => {
    setSucursalSeleccionada(sucursal);
    setFormData({
      name: sucursal.name || "",
      address: sucursal.address || "",
      birthday: sucursal.birthday ? sucursal.birthday.slice(0, 10) : "",
      schedule: sucursal.schedule || "",
      telephone: sucursal.telephone || "",
    });
    setModalEditarVisible(true);
  };

  const cerrarModalEditar = () => {
    setModalEditarVisible(false);
    setFormData({
      name: "",
      address: "",
      birthday: "",
      schedule: "",
      telephone: "",
    });
  };

  const guardarEdicion = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/branches/${sucursalSeleccionada._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Error al actualizar sucursal");
      cerrarModalEditar();
      obtenerSucursales();
    } catch (error) {
      console.error(error);
      alert("Error al actualizar sucursal");
    }
  };

  const abrirModalEliminar = (sucursal) => {
    setSucursalSeleccionada(sucursal);
    setModalEliminarVisible(true);
  };

  const confirmarEliminar = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/branches/${sucursalSeleccionada._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar sucursal");
      setModalEliminarVisible(false);
      obtenerSucursales();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar sucursal");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tabla de Sucursales</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500 border border-gray-200">
          <thead className="text-xs text-white uppercase bg-green-600">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Dirección</th>
              <th className="px-4 py-2">Fecha de creación</th>
              <th className="px-4 py-2">Horario</th>
              <th className="px-4 py-2">Teléfono</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sucursales.map((suc) => (
              <tr key={suc._id} className="bg-white border-b hover:bg-gray-100">
                <td className="px-4 py-2">{suc.name}</td>
                <td className="px-4 py-2">{suc.address || "-"}</td>
                <td className="px-4 py-2">{new Date(suc.birthday).toLocaleDateString()}</td>
                <td className="px-4 py-2">{suc.schedule || "-"}</td>
                <td className="px-4 py-2">{suc.telephone || "-"}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => abrirModalEditar(suc)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => abrirModalEliminar(suc)}
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
          <div className="bg-white rounded p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Editar Sucursal</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                guardarEdicion();
              }}
              className="space-y-3"
            >
              <input
                type="text"
                placeholder="Nombre"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border rounded px-2 py-1"
                required
              />
              <input
                type="text"
                placeholder="Dirección"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full border rounded px-2 py-1"
              />
              <input
                type="date"
                value={formData.birthday}
                onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                className="w-full border rounded px-2 py-1"
                required
              />
              <input
                type="text"
                placeholder="Horario"
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                className="w-full border rounded px-2 py-1"
                required
              />
              <input
                type="number"
                placeholder="Teléfono"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                className="w-full border rounded px-2 py-1"
                required
              />

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={cerrarModalEditar}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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
          <div className="bg-white rounded p-6 w-80 text-center">
            <h2 className="text-xl font-bold mb-4">¿Desea eliminar esta sucursal?</h2>
            <p className="mb-6">{sucursalSeleccionada?.name}</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setModalEliminarVisible(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                No
              </button>
              <button
                onClick={confirmarEliminar}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Sí
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablaSucursales;
