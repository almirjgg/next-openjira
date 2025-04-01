import { Box, Button, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { ChangeEvent, MouseEvent, useContext, useState } from 'react';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);
  const { addNewEntry } = useContext(EntriesContext);

  const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    setIsAddingEntry(false);
    setInputValue('');
    setTouched(false);
  };

  const onCancel = (event: MouseEvent) => {
    setTouched(false);
    setIsAddingEntry(false);
    setInputValue('');
  };

  return (
    <Box sx={{ paddingX: 2, marginBottom: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            sx={{ marginBottom: 1, marginTop: 2 }}
            fullWidth
            placeholder='Your entry'
            autoFocus
            multiline
            label='New Entry'
            helperText={inputValue.length <= 0 && touched && 'Please enter a value'}
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={onTextFieldChange}
            onBlur={() => setTouched(true)}
          />
          <Box display='flex' justifyContent='space-between'>
            <Button variant='text' onClick={onCancel} onMouseDown={onCancel}>
              Cancel
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              endIcon={<SaveOutlinedIcon />}
              disabled={inputValue.length <= 0}
              onClick={onSave}
            >
              Save
            </Button>
          </Box>
        </>
      ) : (
        <Button
          sx={{ marginBottom: 2 }}
          variant='outlined'
          fullWidth
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={() => setIsAddingEntry(true)}
        >
          Add new entry
        </Button>
      )}
    </Box>
  );
};
