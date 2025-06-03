import React, { useState, useRef } from "react";

const RegistroProveedores = () => {
  const [formData, setFormData] = useState({
    name: "",
    telephone: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Referencia para el input file oculto
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Función para abrir el selector de archivos cuando se clickea el botón personalizado
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Quitar la imagen seleccionada
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("telephone", formData.telephone);
      if (imageFile) data.append("image", imageFile);

      const res = await fetch("http://localhost:4000/api/providers", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Error al registrar proveedor");

      const result = await res.json();
      alert("Proveedor registrado con éxito!");
      console.log("Proveedor registrado:", result);

      setFormData({ name: "", telephone: "" });
      removeImage();
      e.target.reset();

    } catch (error) {
      console.error(error);
      alert("Error al registrar proveedor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-400 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-4xl">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl font-bold text-yellow-700 mb-6 text-center lg:text-left">
              Registro de Proveedores
            </h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre del proveedor"
                required
                className="border rounded-xl px-4 py-2"
              />
              <input
                type="text"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                placeholder="Teléfono"
                required
                className="border rounded-xl px-4 py-2"
              />

              {/* Input oculto de archivo */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Botón personalizado para seleccionar imagen */}
              <button
                type="button"
                onClick={handleButtonClick}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-xl font-semibold transition-transform transform hover:scale-105 active:scale-95"
              >
                {imageFile ? "Cambiar imagen" : "Seleccionar imagen"}
              </button>

              {/* Previsualización con botón para eliminar */}
              {imagePreview && (
                <div className="relative w-40 h-40 mx-auto mt-4 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={imagePreview}
                    alt="Previsualización"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-1 right-1 bg-red-600 rounded-full p-1 text-white hover:bg-red-700 transition"
                    title="Eliminar imagen"
                  >
                    &#10005;
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-xl font-semibold mt-6"
              >
                Registrar Proveedor
              </button>
            </form>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="w-52 h-52 text-yellow-400"
              fill="currentColor"
            >
              <path d="M10 10h44v4H10zM14 18h36v4H14zM18 26h28v4H18zM22 34h20v4H22zM26 42h12v4H26z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroProveedores;
