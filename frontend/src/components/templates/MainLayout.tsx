import React from 'react';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
      {children}
    </main>
  );
};