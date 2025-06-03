import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/inicio/inicio.jsx';
import RegistroDatos from './pages/registroDatos/registroDatos.jsx';
import TablasDatos from './pages/tablasDatos/tablasDatos.jsx';

import EmpleadosCRUD from "./pages/registroDatos/empleados.jsx";
import SucursalesCRUD from "./pages/registroDatos/sucursales.jsx";
import RegistroProveedores from "./pages/registroDatos/proveedores.jsx";

// Estas serían las nuevas páginas con tablas (reutiliza o crea nuevos componentes si es necesario)
import TablaEmpleados from "./pages/tablasDatos/empleadosT.jsx";
import TablaSucursales from "./pages/tablasDatos/sucursalesT.jsx";
import TablaProveedores from "./pages/tablasDatos/proveedoresT.jsx";

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/registro" element={<RegistroDatos />} />
      <Route path="/tablas" element={<TablasDatos />} />

      <Route path="/registro/empleados" element={<EmpleadosCRUD />} />
      <Route path="/registro/sucursales" element={<SucursalesCRUD />} />
      <Route path="/registro/proveedores" element={<RegistroProveedores />} />

      
      <Route path="/tablas/empleados" element={<TablaEmpleados />} />
      <Route path="/tablas/sucursales" element={<TablaSucursales />} />
      <Route path="/tablas/proveedores" element={<TablaProveedores />} />
    </Routes>
  );
}

export default App;
