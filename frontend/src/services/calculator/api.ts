import type { CalculationResponse, OperationType } from '../../lib/types/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const calculateService = async (operation: OperationType, a: number, b?: number): Promise<number> => {
  const response = await fetch(`${API_BASE_URL}/calculate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ operation, a, b }),
  });

  const data: CalculationResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error al procesar el cálculo');
  }

  return data.result;
};