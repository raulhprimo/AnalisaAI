const API_URL = 'http://localhost:8000/api';

export interface ContractAnalysis {
  data: Record<string, number>;
  visualization: string;
}

export interface TemporalAnalysis {
  data: Array<{
    ano_cadastro: number;
    mes_cadastro: number;
    data: string;
    quantidade: number;
  }>;
  visualization: string;
}

const handleApiError = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Erro na requisição');
  }
  return response;
};

export const api = {
  // Upload de arquivo
  uploadFile: async (file: File): Promise<{ message: string; filename: string }> => {
    try {
      console.log('Iniciando upload do arquivo:', file.name);
      console.log('Tipo do arquivo:', file.type);
      console.log('Tamanho:', file.size, 'bytes');

      const formData = new FormData();
      formData.append('file', file, file.name);

      console.log('Enviando requisição para:', `${API_URL}/upload`);
      
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro na resposta:', errorData);
        throw new Error(errorData.detail || 'Erro ao fazer upload do arquivo');
      }

      const data = await response.json();
      console.log('Resposta do servidor:', data);
      return data;
    } catch (error) {
      console.error('Erro no upload:', error);
      throw error;
    }
  },

  // Análises de contratos
  getContractStatus: async (): Promise<ContractAnalysis> => {
    const response = await fetch(`${API_URL}/contracts/status`);
    await handleApiError(response);
    return response.json();
  },

  getContractModalidade: async (): Promise<ContractAnalysis> => {
    const response = await fetch(`${API_URL}/contracts/modalidade`);
    await handleApiError(response);
    return response.json();
  },

  getContractTemporal: async (): Promise<TemporalAnalysis> => {
    const response = await fetch(`${API_URL}/contracts/temporal`);
    await handleApiError(response);
    return response.json();
  },

  getContractResponsavel: async (): Promise<ContractAnalysis> => {
    const response = await fetch(`${API_URL}/contracts/responsavel`);
    await handleApiError(response);
    return response.json();
  },
}; 