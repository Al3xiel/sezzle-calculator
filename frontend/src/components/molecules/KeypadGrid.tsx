import { Button } from '../atoms/Button';
import type { OperationType } from '../../lib/types/types';

interface KeypadGridProps {
  handleOperator: (op: OperationType) => void;
  clearAll: () => void;
  inputDigit: (digit: string) => void;
  inputDecimal: () => void;
  handleEquals: () => void;
  loading: boolean;
}

export const KeypadGrid = ({
  handleOperator,
  clearAll,
  inputDigit,
  inputDecimal,
  handleEquals,
  loading
}: KeypadGridProps) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      <Button variant="special" disabled={loading} onClick={() => handleOperator('sqrt')}>√x</Button>
      <Button variant="special" disabled={loading} onClick={() => handleOperator('power')}>x^y</Button>
      <Button variant="action" onClick={clearAll}>AC</Button>
      <Button variant="operator" disabled={loading} onClick={() => handleOperator('add')}>+</Button>

      {/* Resto de botones numéricos */}
      <Button onClick={() => inputDigit('7')}>7</Button>
      <Button onClick={() => inputDigit('8')}>8</Button>
      <Button onClick={() => inputDigit('9')}>9</Button>
      <Button variant="operator" disabled={loading} onClick={() => handleOperator('subtract')}>-</Button>

      <Button onClick={() => inputDigit('4')}>4</Button>
      <Button onClick={() => inputDigit('5')}>5</Button>
      <Button onClick={() => inputDigit('6')}>6</Button>
      <Button variant="operator" disabled={loading} onClick={() => handleOperator('multiply')}>×</Button>

      <Button onClick={() => inputDigit('1')}>1</Button>
      <Button onClick={() => inputDigit('2')}>2</Button>
      <Button onClick={() => inputDigit('3')}>3</Button>
      <Button variant="operator" disabled={loading} onClick={() => handleOperator('divide')}>÷</Button>

      <Button onClick={() => inputDigit('0')}>0</Button>
      <Button onClick={inputDecimal}>.</Button>
      <Button disabled={loading} onClick={() => handleOperator('percentage')}>%</Button>
      <Button variant="equals" disabled={loading} onClick={handleEquals}>=</Button>
    </div>
  );
};