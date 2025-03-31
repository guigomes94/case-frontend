import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAreas, deleteArea } from '../services/areaService';

interface Area {
  id: string;
  name: string;
  description: string;
}

const Areas = () => {
  const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
    loadAreas();
  }, []);

  const loadAreas = async () => {
    const data = await getAreas();
    setAreas(data);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta área?')) {
      const success = await deleteArea(id);
      if (success) {
        setAreas(areas.filter(area => area.id !== id)); // Remove da lista sem recarregar a página
      } else {
        alert('Erro ao excluir a área');
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/areas/novo" className="btn btn-success">
          <i className="bi bi-plus-lg me-2"></i> Novo
        </Link>
      </div>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Nome</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {areas.map(area => (
            <tr key={area.id}>
              <td>{area.name}</td>
              <td className="text-center">
                <Link to={`/areas/editar/${area.id}`} className="btn btn-primary btn-sm me-2">
                  <i className="bi bi-pencil"></i>
                </Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(area.id)}>
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Areas;
