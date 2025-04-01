import { UIState } from './UIProvider';

type UIActionType =
  | { type: 'UI - Open Sidebar' }
  | { type: 'UI - Close Sidebar' }
  | { type: 'UI - Set IsAdding Entry'; payload: boolean }
  | { type: 'UI - Set IsDragging'; payload: boolean };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case 'UI - Open Sidebar':
      return {
        ...state,
        sideMenuOpen: true,
      };
    case 'UI - Close Sidebar':
      return {
        ...state,
        sideMenuOpen: false,
      };
    case 'UI - Set IsAdding Entry':
      return {
        ...state,
        isAddingEntry: action.payload,
      };
    case 'UI - Set IsDragging':
      return {
        ...state,
        isDragging: action.payload,
      };
    default:
      return state;
  }
};
