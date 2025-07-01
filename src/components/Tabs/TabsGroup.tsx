import React, { useState } from 'react';
import { TabsContext } from './context/TabsContext';
import { TabsProps } from './types/tabs';

export const TabsGroup: React.FC<TabsProps> = ({ 
  defaultValue, 
  children, 
  className = '' 
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`w-full ${className}`}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};