import React, { useState } from "react";

const RegistroSucursales = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    birthday: "",
    schedule: "",
    telephone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/branches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error al registrar la sucursal");
        return;
      }

      alert("Sucursal registrada con éxito");

      // Limpiar formulario
      setFormData({
        name: "",
        address: "",
        birthday: "",
        schedule: "",
        telephone: "",
      });
    } catch (error) {
      console.error("Error al registrar sucursal:", error);
      alert("Error en la conexión con el servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-emerald-400 to-green-500 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-4xl">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl font-bold text-emerald-700 mb-6 text-center lg:text-left">
              Registro de Sucursales
            </h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre de la sucursal"
                required
                className="border rounded-xl px-4 py-2"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Dirección"
                className="border rounded-xl px-4 py-2"
              />
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                required
                className="border rounded-xl px-4 py-2"
              />
              <input
                type="text"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                placeholder="Horario de atención"
                required
                className="border rounded-xl px-4 py-2"
              />
              <input
                type="number"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                placeholder="Teléfono"
                required
                className="border rounded-xl px-4 py-2"
              />
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-xl font-semibold"
              >
                Registrar Sucursal
              </button>
            </form>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="w-52 h-52 text-emerald-400"
              fill="currentColor"
            >
              <path d="M12 28h40v4H12zM20 20h24v4H20zM8 36h48v4H8zM16 44h32v4H16z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroSucursales;
