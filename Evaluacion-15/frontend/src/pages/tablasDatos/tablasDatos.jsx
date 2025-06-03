import React from "react";
import { useNavigate } from "react-router-dom";

const TablasDatos = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1800px]">
        
        {/* EMPLEADOS */}
        <div
          onClick={() => navigate("/tablas/empleados")}
          className="bg-black rounded-2xl text-white cursor-pointer transition-transform hover:scale-105 flex flex-col items-center justify-center p-10"
        >
          <h2 className="text-2xl font-bold mb-6">EMPLEADOS</h2>
          <svg className="w-20 h-20 text-[#004865]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>
        </div>

        {/* SUCURSALES */}
        <div
          onClick={() => navigate("/tablas/sucursales")}
          className="bg-black rounded-2xl text-white cursor-pointer transition-transform hover:scale-105 flex flex-col items-center justify-center p-10"
        >
          <h2 className="text-2xl font-bold mb-6">SUCURSALES</h2>
          <svg className="w-20 h-20 text-[#004865]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 4.25 7 13 7 13s7-8.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
          </svg>
        </div>

        {/* PROVEEDORES */}
        <div
          onClick={() => navigate("/tablas/proveedores")}
          className="bg-black rounded-2xl text-white cursor-pointer transition-transform hover:scale-105 flex flex-col items-center justify-center p-10"
        >
          <h2 className="text-2xl font-bold mb-6">PROVEEDORES</h2>
          <svg className="w-20 h-20 text-[#004865]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 3v2h2l3.6 7.59-1.35 2.44C6.52 15.37 7.48 17 9 17h12v-2H9.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 21.42 4H5.21l-.94-2H1v2h2zm16 16c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-10 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
          </svg>
        </div>

      </div>
    </div>
  );
};

export default TablasDatos;
