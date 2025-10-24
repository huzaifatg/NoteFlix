import React from 'react';

export default function Button({ variant = 'primary', size = 'md', className = '', children, ...props }) {
  const base = 'inline-flex items-center justify-center font-medium transition-all duration-200 outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizes = {
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-xl',
  };
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 focus:ring-blue-100',
    secondary: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 focus:ring-purple-100',
    ghost: 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-100',
    outline: 'border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 focus:ring-slate-100',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 focus:ring-red-100',
  };
  
  const cls = [base, sizes[size] || sizes.md, variants[variant] || variants.primary, className]
    .filter(Boolean)
    .join(' ');
    
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
