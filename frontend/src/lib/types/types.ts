export type OperationType = 'add' | 'subtract' | 'multiply' | 'divide' | 'sqrt' | 'power' | 'percentage';

export interface CalculationRequest {
  operation: OperationType;
  a: number;
  b?: number;
}

export interface CalculationResponse {
  result: number;
  error?: string;
}