import React from "react";
import { useNavigate } from "react-router-dom";
import RegistroImg from "../../assets/Registro.svg";
import TablasImg from "../../assets/Tablas.svg";

const Inicio = () => {
  const navigate = useNavigate();

  return (
    
       
      <div className="grid grid-cols-1 gap-8 w-full max-w-[1800px]">
        
        {/* CARD 1 */}
        <div
          onClick={() => navigate("/registro")}
          className="bg-sky-400 rounded-2xl shadow-xl text-white cursor-pointer transition-transform hover:scale-105 flex items-center justify-between px-10 py-8 w-full"
        >
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-4">REGISTRO DE DATOS</h2>
            <p className="text-lg">Ingresa nuevos datos en el sistema fácilmente.</p>
          </div>
          <img src={RegistroImg} alt="Registro" className="w-40 h-40 object-contain" />
        </div>

        {/* CARD 2 */}
        <div
          onClick={() => navigate("/tablas")}
          className="bg-cyan-400 rounded-2xl shadow-xl text-white cursor-pointer transition-transform hover:scale-105 flex items-center justify-between px-10 py-8 w-full"
        >
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-4">TABLAS DE DATOS</h2>
            <p className="text-lg">Consulta y gestiona los datos existentes.</p>
          </div>
          <img src={TablasImg} alt="Tablas" className="w-40 h-40 object-contain" />
        </div>

      </div>
   
    
  );
};

export default Inicio;
