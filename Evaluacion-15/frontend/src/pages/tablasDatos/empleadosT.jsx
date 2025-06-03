import React, { useEffect, useState } from "react";

const TablaEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    telephone: "",
    dui: "",
    issNumber: "",
    hireDate: "",
  });

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  const obtenerEmpleados = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/employee");
      if (!res.ok) throw new Error("Error al obtener empleados");
      const data = await res.json();
      setEmpleados(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Abrir modal editar y llenar el formulario con datos actuales
  const abrirModalEditar = (empleado) => {
    setEmpleadoSeleccionado(empleado);
    setFormData({
      name: empleado.name,
      lastName: empleado.lastName,
      email: empleado.email,
      telephone: empleado.telephone,
      dui: empleado.dui,
      issNumber: empleado.issNumber,
      hireDate: empleado.hireDate.slice(0, 10), // Para input date YYYY-MM-DD
    });
    setModalEditarVisible(true);
  };

  // Guardar cambios del empleado editado (aquí debes hacer el PUT a tu backend)
  const guardarEdicion = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/employee/${empleadoSeleccionado._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Error al actualizar empleado");

      setModalEditarVisible(false);
      obtenerEmpleados(); // recargar datos
    } catch (error) {
      console.error(error);
      alert("Error al actualizar empleado");
    }
  };

  // Abrir modal eliminar
  const abrirModalEliminar = (empleado) => {
    setEmpleadoSeleccionado(empleado);
    setModalEliminarVisible(true);
  };

  // Confirmar eliminar empleado (hacer DELETE)
  const confirmarEliminar = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/employee/${empleadoSeleccionado._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar empleado");

      setModalEliminarVisible(false);
      obtenerEmpleados();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar empleado");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tabla de Empleados</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500 border border-gray-200">
          <thead className="text-xs text-white uppercase bg-gray-800">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Apellido</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Teléfono</th>
              <th className="px-4 py-2">DUI</th>
              <th className="px-4 py-2">ISS</th>
              <th className="px-4 py-2">Fecha Contrato</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((emp) => (
              <tr key={emp._id} className="bg-white border-b hover:bg-gray-100">
                <td className="px-4 py-2">{emp.name}</td>
                <td className="px-4 py-2">{emp.lastName}</td>
                <td className="px-4 py-2">{emp.email}</td>
                <td className="px-4 py-2">{emp.telephone}</td>
                <td className="px-4 py-2">{emp.dui}</td>
                <td className="px-4 py-2">{emp.issNumber}</td>
                <td className="px-4 py-2">{new Date(emp.hireDate).toLocaleDateString()}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => abrirModalEditar(emp)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => abrirModalEliminar(emp)}
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
            <h2 className="text-xl font-bold mb-4">Editar Empleado</h2>
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
                placeholder="Apellido"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full border rounded px-2 py-1"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border rounded px-2 py-1"
                required
              />
              <input
                type="tel"
                placeholder="Teléfono"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                className="w-full border rounded px-2 py-1"
              />
              <input
                type="text"
                placeholder="DUI"
                value={formData.dui}
                onChange={(e) => setFormData({ ...formData, dui: e.target.value })}
                className="w-full border rounded px-2 py-1"
              />
              <input
                type="text"
                placeholder="ISS"
                value={formData.issNumber}
                onChange={(e) => setFormData({ ...formData, issNumber: e.target.value })}
                className="w-full border rounded px-2 py-1"
              />
              <input
                type="date"
                placeholder="Fecha Contrato"
                value={formData.hireDate}
                onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                className="w-full border rounded px-2 py-1"
                required
              />

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setModalEditarVisible(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
            <h2 className="text-xl font-bold mb-4">¿Desea eliminar este empleado?</h2>
            <p className="mb-6">
              {empleadoSeleccionado?.name} {empleadoSeleccionado?.lastName}
            </p>
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

export default TablaEmpleados;
