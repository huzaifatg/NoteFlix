import React from 'react';

export default function Card({ className = '', children, ...props }) {
  const cls = [
    'card bg-base-100 border border-base-300/60 shadow-sm hover:shadow-md transition-transform',
    'hover:-translate-y-0.5',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cls} {...props}>
      <div className="card-body">{children}</div>
    </div>
  );
}
