import { createContext } from 'react';

export interface UIContextProps {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;

  // Methods
  openSideMenu: () => void;
  closeSideMenu: () => void;
  setIsAddingEntry: (isAdding: boolean) => void;
  setIsDragging: (isDragging: boolean) => void;
}

export const UIContext = createContext({} as UIContextProps);
