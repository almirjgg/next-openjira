import { List, Paper } from '@mui/material';
import { EntryCard } from './';
import { EntryStatus } from '../../interfaces';
import { useContext, useMemo } from 'react';
import { EntriesContext } from '../../context/entries';

interface Props {
  status: EntryStatus;
}

export const EntryList: React.FC<Props> = ({ status }) => {
  const { entries } = useContext(EntriesContext);

  const statusEntries = useMemo(() => entries.filter(entry => entry.status === status), [entries]);
  return (
    <div>
      <Paper
        variant='outlined'
        square={false}
        sx={{
          height: 'calc(100vh - 250px)',
          overflow: 'auto',
          backgroundColor: 'transparent',
          padding: '2px 5px',
        }}
      >
        <List sx={{ opacity: 1 }}>
          {/* enhance the scrollbar */}
          {statusEntries.map(entry => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
