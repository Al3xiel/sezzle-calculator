import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'number' | 'operator' | 'action' | 'equals' | 'special';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'number', className = '', ...props }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'operator':
        return 'py-3 bg-emerald-600/90 hover:bg-emerald-500 rounded-xl font-bold text-slate-950 transition';
      case 'special':
        return 'py-3 bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-800/60 rounded-xl font-medium text-indigo-300 transition shadow-sm';
      case 'action':
        return 'py-3 bg-rose-950/40 hover:bg-rose-950/60 border border-rose-900/60 rounded-xl font-medium text-rose-300 transition';
      case 'equals':
        return 'py-3 bg-amber-500 hover:bg-amber-400 rounded-xl font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition';
      case 'number':
      default:
        return 'py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl font-medium transition text-slate-100';
    }
  };

  return (
    <button className={`${getVariantStyles()} ${className}`} {...props}>
      {children}
    </button>
  );
};