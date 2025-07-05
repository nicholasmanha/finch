import { ReactNode } from 'react';

export interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  className?: string;
}

export interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export interface TabProps {
  value: string;
  children: ReactNode;
  removeTab: (tabId: string) => void
  className?: string;
}

export interface TabsPanelProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export interface TabData {
  id: string;
  label: string;
  content: React.ReactNode;
}