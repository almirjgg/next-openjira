import { useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import { v4 as uuidv4 } from 'uuid';

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      status: 'pending',
      createdAt: Date.now(),
    };
    dispatch({ type: '[Entry] Add-Entry', payload: newEntry });
  };

  const onEntryUpdated = (entry: Entry) => {
    dispatch({ type: '[Entry] Entry-Updated', payload: entry });
  };
  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry, onEntryUpdated }}>
      {children}
    </EntriesContext.Provider>
  );
};
