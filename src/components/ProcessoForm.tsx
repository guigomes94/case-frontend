import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProcessoById, createProcesso, editProcesso } from '../services/processoService';

const ProcessoForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tools, setTools] = useState<string>('');
  const [responsables, setResponsables] = useState<string>('');
  const [documentation, setDocumentation] = useState<string>('');
  const [processoParentId, setProcessoParentId] = useState<string>('');
  const [areaId, setAreaId] = useState<string>('');

  useEffect(() => {
    if (id) {
      getProcessoById(id)
        .then((processo) => {
          if (processo) {
            setName(processo.name);
            setDescription(processo.description);
            setTools(processo.tools);
            setResponsables(processo.responsables);
            setDocumentation(processo.documentation);
            setProcessoParentId(processo.processoParentId ?? '');
            setAreaId(processo.areaId ?? '');
          } else {
            console.error('Processo não encontrado');
          }
        })
        .catch((error) => console.error('Erro ao buscar processo:', error));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const processoData = {
      name,
      description,
      tools,
      responsables,
      documentation,
      processoParentId,
      areaId,
    };

    let success;
    if (id) {
      // Se o id estiver presente, fazemos a atualização
      success = await editProcesso(id, processoData);
    } else {
      // Caso contrário, criamos um novo processo
      success = await createProcesso(processoData);
    }

    if (success) {
      navigate('/processos'); // Redireciona para a lista de processos
    } else {
      alert('Erro ao salvar o processo');
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Editar Processo' : 'Novo Processo'}</h2>
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tools" className="form-label">Ferramentas</label>
          <input
            type="text"
            className="form-control"
            id="tools"
            value={tools}
            onChange={(e) => setTools(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="responsables" className="form-label">Responsáveis</label>
          <input
            type="text"
            className="form-control"
            id="responsables"
            value={responsables}
            onChange={(e) => setResponsables(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="documentation" className="form-label">Documentação</label>
          <input
            type="text"
            className="form-control"
            id="documentation"
            value={documentation}
            onChange={(e) => setDocumentation(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="processoParentId" className="form-label">Processo Pai</label>
          <input
            type="text"
            className="form-control"
            id="processoParentId"
            value={processoParentId}
            onChange={(e) => setProcessoParentId(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="areaId" className="form-label">Área</label>
          <input
            type="text"
            className="form-control"
            id="areaId"
            value={areaId}
            onChange={(e) => setAreaId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Salvar Alterações' : 'Criar Processo'}
        </button>
      </form>
    </div>
  );
};

export default ProcessoForm;