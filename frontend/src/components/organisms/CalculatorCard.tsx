import { Badge } from '../atoms/Badge';
import { CalculatorDisplay } from '../molecules/CalculatorDisplay';
import { KeypadGrid } from '../molecules/KeypadGrid';
import { useCalculator } from '../../lib/hooks/useCalculator';

export const CalculatorCard = () => {
  const {
    display,
    firstOperand,
    operation,
    symbolMap,
    loading,
    errorMessage,
    inputDigit,
    inputDecimal,
    handleOperator,
    handleEquals,
    clearAll
  } = useCalculator();

  return (
    <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
      <Badge />

      <CalculatorDisplay 
        firstOperand={firstOperand} 
        operation={operation} 
        symbolMap={symbolMap} 
        display={display} 
        loading={loading} 
      />

      {errorMessage && (
        <div className="bg-rose-950/50 border border-rose-800/80 text-rose-300 text-xs p-3 rounded-lg">
          ⚠️ {errorMessage}
        </div>
      )}

      <KeypadGrid 
        handleOperator={handleOperator}
        clearAll={clearAll}
        inputDigit={inputDigit}
        inputDecimal={inputDecimal}
        handleEquals={handleEquals}
        loading={loading}
      />
    </div>
  );
};