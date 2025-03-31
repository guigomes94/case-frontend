const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PROCESSO_URL = `${API_BASE_URL}/api/Processo`;

export const getProcessos = async () => {
  try {
    const response = await fetch(PROCESSO_URL);
    if (!response.ok) throw new Error('Erro ao buscar processos');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getProcessoById = async (id: string) => {
  try {
    const response = await fetch(`${PROCESSO_URL}/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar processo');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createProcesso = async (processo: {
  name: string;
  description: string;
  tools: string;
  responsables: string;
  documentation: string;
  processoParentId: string;
  areaId: string;
}) => {
  try {
    const processoFormatado = {
      ...processo,
      processoParentId: processo.processoParentId.trim() === '' ? null : processo.processoParentId,
    };

    const response = await fetch(PROCESSO_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(processoFormatado),
    });
    if (!response.ok) throw new Error('Erro ao criar processo');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const editProcesso = async (id: string, processo: {
  name: string;
  description: string;
  tools: string;
  responsables: string;
  documentation: string;
  processoParentId: string;
  areaId: string;
}) => {
  try {
    const response = await fetch(`${PROCESSO_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(processo),
    });
    if (!response.ok) throw new Error('Erro ao editar processo');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteProcesso = async (id: string) => {
  try {
    const response = await fetch(`${PROCESSO_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Erro ao excluir processo');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
