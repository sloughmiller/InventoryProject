// src/components/cards/BaseCard.tsx
import React from 'react';

interface BaseCardProps {
  title: string;
  description?: string;
  footer?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

const BaseCard: React.FC<BaseCardProps> = ({ title, description, footer, actions, children }) => {
  return (
    <div className="bg-white shadow p-4 rounded flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-lg font-semibold text-emerald-700">{title}</h4>
          {description && <p className="text-gray-600 text-sm">{description}</p>}
        </div>
        {actions && <div className="flex items-center space-x-2">{actions}</div>}
      </div>
      {children}
      {footer && <div className="pt-2 border-t text-sm text-gray-500">{footer}</div>}
    </div>
  );
};

export default BaseCard;
