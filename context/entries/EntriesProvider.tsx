import { useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import { v4 as uuidv4 } from 'uuid';

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: 'Pendiente: Prueba 1',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: 'in-progress: Prueba 2',
      status: 'in-progress',
      createdAt: Date.now() - 10000,
    },
    {
      _id: uuidv4(),
      description: 'Completed: Prueba 3',
      status: 'completed',
      createdAt: Date.now() - 12300,
    },
  ],
};

export const EntriesProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  return <EntriesContext.Provider value={{ ...state }}>{children}</EntriesContext.Provider>;
};
