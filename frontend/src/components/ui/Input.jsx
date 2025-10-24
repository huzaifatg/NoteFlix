import React from 'react';

export default function Input({ className = '', ...props }) {
  return (
    <input 
      className={`w-full border border-slate-300 rounded-lg px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none ${className}`}
      {...props} 
    />
  );
}
