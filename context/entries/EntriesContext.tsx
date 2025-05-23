import { createContext } from 'react';
import { Entry } from '../../interfaces';

export interface ContextProps {
  entries: Entry[];
  addNewEntry: (description: string) => void;
  onEntryUpdated: (entry: Entry, showSnackbar?: boolean) => void;
}

export const EntriesContext = createContext({} as ContextProps);
