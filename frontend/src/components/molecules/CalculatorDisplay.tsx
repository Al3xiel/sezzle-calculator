interface CalculatorDisplayProps {
  firstOperand: number | null;
  operation: string | null;
  symbolMap: Record<string, string>;
  display: string;
  loading: boolean;
}

export const CalculatorDisplay = ({ firstOperand, operation, symbolMap, display, loading }: CalculatorDisplayProps) => {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-right min-h-[90px] flex flex-col justify-end">
      <div className="text-xs text-slate-500 h-5 font-mono">
        {firstOperand !== null && operation ? `${firstOperand} ${symbolMap[operation] || ''}` : ''}
      </div>
      <div className="text-3xl font-bold tracking-tight text-white truncate font-mono">
        {loading ? '......' : display}
      </div>
    </div>
  );
};