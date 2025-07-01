import React from 'react';
import { useTabsContext } from './context/TabsContext';
import { TabProps } from './types/tabs';

export const Tab: React.FC<TabProps> = ({ 
  value, 
  children, 
  className = '' 
}) => {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      className={`px-4 py-2 text-xl transition-colors duration-200 border-b-2 ${
        isActive
          ? 'text-blue-400 border-blue-600'
          : 'text-white border-transparent hover:text-gray-400 hover:border-gray-300'
      } ${className}`}
      onClick={() => setActiveTab(value)}
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${value}`}
      id={`tab-${value}`}
    >
      {children}
    </button>
  );
};