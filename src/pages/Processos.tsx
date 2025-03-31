import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProcessos, deleteProcesso } from '../services/processoService';
import { Processo } from '../models/Processo';

const Processos = () => {
  const [processos, setProcessos] = useState<Processo[]>([]);

  useEffect(() => {
    const fetchProcessos = async () => {
      const data = await getProcessos();
      setProcessos(data);
    };

    fetchProcessos();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este processo?');
    if (confirmDelete) {
      const success = await deleteProcesso(id);
      if (success) {
        setProcessos(processos.filter(processo => processo.id !== id));
      } else {
        alert('Erro ao excluir processo');
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/processos/novo" className="btn btn-success">
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
          {processos.map(processo => (
            <tr key={processo.id}>
              <td>{processo.name}</td>
              <td className="text-center">
                <Link to={`/processos/editar/${processo.id}`} className="btn btn-primary btn-sm me-2">
                  <i className="bi bi-pencil"></i>
                </Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(processo.id)}>
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

export default Processos;
