import React from 'react';

export const Alert = ({ children, className }) => (
  <div className={`p-4 bg-white border-l-4 border-blue-700 text-gray-600 ${className}`}>
    {children}
  </div>
);

export const AlertTitle = ({ children }) => (
  <h3 className="font-bold">{children}</h3>
);

export const AlertDescription = ({ children }) => (
  <p>{children}</p>
);