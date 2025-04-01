import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces';
import { DragEvent, useContext } from 'react';
import { UIContext } from '../../context/ui';

interface Props {
  entry: Entry;
}

export const EntryCard: React.FC<Props> = ({ entry }) => {
  const { setIsDragging } = useContext(UIContext);
  const onDragStart = (event: DragEvent) => {
    setIsDragging(true);
    event.dataTransfer.setData('text', entry._id);
  };

  //chekar
  const onDragEnd = (event: DragEvent) => {
    setIsDragging(false);
  };
  return (
    <Card
      variant='outlined'
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'>{entry.createdAt}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
