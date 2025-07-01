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
  className?: string;
}

export interface TabsPanelProps {
  value: string;
  children: ReactNode;
  className?: string;
}