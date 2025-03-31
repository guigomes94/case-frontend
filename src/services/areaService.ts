const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AREA_URL = `${API_BASE_URL}/api/Area`;

export const getAreas = async () => {
  try {
    const response = await fetch(AREA_URL);
    if (!response.ok) throw new Error('Erro ao buscar áreas');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAreaById = async (id: string) => {
    try {
      const response = await fetch(`${AREA_URL}/${id}`);
      if (!response.ok) throw new Error('Erro ao buscar área');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const createArea = async (area: { name: string; description: string }) => {
    try {
      const response = await fetch(AREA_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(area),
      });
      if (!response.ok) throw new Error('Erro ao criar área');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  export const editArea = async (id: string, area: { name: string; description: string }) => {
    try {
      const response = await fetch(`${AREA_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(area),
      });
      if (!response.ok) throw new Error('Erro ao editar área');
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const deleteArea = async (id: string) => {
  try {
    const response = await fetch(`${AREA_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Erro ao excluir área');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
