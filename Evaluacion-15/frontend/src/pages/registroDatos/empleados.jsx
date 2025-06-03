import React, { useState } from "react";

const RegistroEmpleados = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    birthday: "",
    email: "",
    address: "",
    password: "",
    hireDate: "",
    telephone: "",
    dui: "",
    issNumber: "",  // corregido a camelCase para coincidir con backend
    isVerified: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/registerEmployees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Para enviar y recibir cookies (JWT)
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error al registrar el empleado");
        return;
      }

      alert("Empleado registrado con éxito");
      setFormData({
        name: "",
        lastName: "",
        birthday: "",
        email: "",
        address: "",
        password: "",
        hireDate: "",
        telephone: "",
        dui: "",
        issNumber: "",
        isVerified: false,
      });
    } catch (error) {
      console.error("Error al registrar empleado:", error);
      alert("Error en la conexión con el servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-500 to-cyan-500 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-4xl">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl font-bold text-sky-700 mb-6 text-center lg:text-left">
              Registro de Empleados
            </h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre"
                required
                className="border rounded-xl px-4 py-2"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Apellido"
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
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
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
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Contraseña"
                required
                className="border rounded-xl px-4 py-2"
              />
              <input
                type="date"
                name="hireDate"
                value={formData.hireDate}
                onChange={handleChange}
                placeholder="Fecha de contratación"
                className="border rounded-xl px-4 py-2"
              />
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                placeholder="Teléfono"
                required
                className="border rounded-xl px-4 py-2"
              />
              <input
                type="text"
                name="dui"
                value={formData.dui}
                onChange={handleChange}
                placeholder="DUI"
                required
                className="border rounded-xl px-4 py-2"
              />
              <input
                type="text"
                name="issNumber"
                value={formData.issNumber}
                onChange={handleChange}
                placeholder="Número ISSS"
                required
                className="border rounded-xl px-4 py-2"
              />
              <label className="flex items-center gap-2 col-span-2">
                <input
                  type="checkbox"
                  name="isVerified"
                  checked={formData.isVerified}
                  onChange={handleChange}
                />
                ¿Verificado?
              </label>
              <button
                type="submit"
                className="col-span-2 bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-xl font-semibold"
              >
                Registrar Empleado
              </button>
            </form>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="w-52 h-52 text-sky-400"
              fill="currentColor"
            >
              <path d="M32 34a14 14 0 1 0-14-14 14 14 0 0 0 14 14zm0-24a10 10 0 1 1-10 10A10 10 0 0 1 32 10zM56 58a24 24 0 0 0-48 0h4a20 20 0 0 1 40 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroEmpleados;
