import { Box, Button, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { ChangeEvent, useState } from 'react';

export const NewEntry = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <Box sx={{ paddingX: 2, marginBottom: 2 }}>
      {isAdding ? (
        <>
          <TextField
            sx={{ marginBottom: 1, marginTop: 2 }}
            fullWidth
            placeholder='Your entry'
            autoFocus
            multiline
            label='New Entry'
            helperText='Please enter a value'
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={onTextFieldChange}
            onBlur={() => setTouched(true)}
          />
          <Box display='flex' justifyContent='space-between'>
            <Button variant='text' onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              endIcon={<SaveOutlinedIcon />}
              onClick={() => setIsAdding(false)}
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
          onClick={() => setIsAdding(true)}
        >
          Add new entry
        </Button>
      )}
    </Box>
  );
};
