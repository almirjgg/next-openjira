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
      description: 'Pendiente: Prueba 2',
      status: 'in-progress',
      createdAt: Date.now() - 10000,
    },
    {
      _id: uuidv4(),
      description: 'Pendiente: Prueba 3',
      status: 'completed',
      createdAt: Date.now() - 12300,
    },
  ],
};

export const EntriesProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  return <EntriesContext.Provider value={{ entries: [] }}>{children}</EntriesContext.Provider>;
};
