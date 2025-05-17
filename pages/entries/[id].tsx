import { ChangeEvent, useMemo, useState, FC, useContext } from 'react';
import { GetServerSideProps } from 'next';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
} from '@mui/material';
import { Layout } from '../../components/layouts';
import { Grid } from '@material-ui/core';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Entry, EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries';
import { dbEntries } from '../../config/database';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'completed'];
interface Props {
  entry: Entry;
}

const EntryPage: FC<Props> = ({ entry }) => {
  const { onEntryUpdated } = useContext(EntriesContext);
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);
  const tranformedText = useMemo(() => inputValue.slice(0, 10) + '...', [inputValue]);
  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {
    if (inputValue.trim().length === 0) return;
    if (inputValue.length < 2) {
      setTouched(true);
      return;
    }
    const updatedEntry: Entry = { ...entry, status, description: inputValue };
    onEntryUpdated(updatedEntry, true);
  };

  return (
    <Layout title={tranformedText}>
      <Grid2 container justifyContent={'center'} sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entry: ${tranformedText}`}
              subheader={`Created ${dateFunctions.getFormatDistanceToNow(entry.createdAt)} ago`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder='New entry'
                multiline
                label='New entry'
                variant='filled'
                autoFocus
                value={inputValue}
                onChange={onInputValueChange}
                onBlur={() => setTouched(true)}
                helperText={isNotValid && 'you must enter a value'}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel>Status:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanged}>
                  {validStatus.map(status => (
                    <FormControlLabel
                      key={status}
                      value={status}
                      control={<Radio />}
                      label={capitalize(status)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActionArea>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant='contained'
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0 || inputValue.length < 2}
              >
                Save
              </Button>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid2>
      <IconButton sx={{ position: 'fixed', bottom: 30, right: 30, backgroundColor: 'error.main' }}>
        <DeleteOutlinedIcon />
      </IconButton>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { id } = ctx.params as { id: string };
  const entry = await dbEntries.getEntriesById(id);

  // Check if the id is a valid MongoDB ObjectId
  if (!entry) {
    // If the entry is not found, redirect to the home page
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};

export default EntryPage;
