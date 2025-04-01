import { List, Paper } from '@mui/material';
import { EntryCard } from './';
import { EntryStatus } from '../../interfaces';
import { DragEvent, useContext, useMemo } from 'react';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import style from './EntryList.module.css';

interface Props {
  status: EntryStatus;
}

export const EntryList: React.FC<Props> = ({ status }) => {
  const { entries, onEntryUpdated } = useContext(EntriesContext);
  const { isDragging, setIsDragging } = useContext(UIContext);

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');
    const entry = entries.find(entry => entry._id === id)!;
    entry.status = status;
    onEntryUpdated(entry);
    setIsDragging(false);
  };
  const statusEntries = useMemo(() => entries.filter(entry => entry.status === status), [entries]);
  return (
    <div onDrop={onDropEntry} onDragOver={allowDrop} className={isDragging ? style.dragging : ''}>
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
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
          {/* enhance the scrollbar */}
          {statusEntries.map(entry => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
