import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Areas from '../pages/Areas';
import Processos from '../pages/Processos';
import AreaForm from '../components/AreaForm';
import ProcessoForm from '../components/ProcessoForm';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/areas" element={<Areas />} />
      <Route path="/areas/novo" element={<AreaForm />} />
      <Route path="/areas/editar/:id" element={<AreaForm />} />
      <Route path="/processos" element={<Processos />} />
      <Route path="/processos/novo" element={<ProcessoForm />} />
      <Route path="/processos/editar/:id" element={<ProcessoForm />} />
    </Routes>
  );
};

export default AppRoutes;
