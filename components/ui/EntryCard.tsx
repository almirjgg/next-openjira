import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces';

interface Props {
  entry: Entry;
}

export const EntryCard: React.FC<Props> = ({ entry }) => {
  return (
    <Card variant='outlined' sx={{ marginBottom: 1 }}>
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
