import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createArea, editArea, getAreaById } from '../services/areaService';

const AreaForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode && id) {
      getAreaById(id)
        .then((area) => {
          if (area) {
            setName(area.name);
            setDescription(area.description);
          } else {
            console.error('Área não encontrada');
          }
        })
        .catch((error) => console.error('Erro ao buscar área:', error));
    }
  }, [isEditMode, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const areaData = { name, description };

    if (isEditMode && id) {
      // Edição de área
      const updatedArea = await editArea(id, areaData);
      if (updatedArea) {
        navigate('/areas');
      } else {
        console.error('Erro ao editar a área');
      }
    } else {
      // Criação de nova área
      const newArea = await createArea(areaData);
      if (newArea) {
        navigate('/areas');
      } else {
        console.error('Erro ao criar a área');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h3>{isEditMode ? 'Editar Área' : 'Nova Área'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descrição</label>
          <textarea
            className="form-control"
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditMode ? 'Salvar alterações' : 'Criar área'}
        </button>
      </form>
    </div>
  );
};

export default AreaForm;
