import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const Reply = ({ parentId, onSubmit }) => {
  const [content, setContent] = useState('');

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(content,parentId);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" alignItems="flex-end">
        <TextField
          multiline
          rows={3}
          variant="outlined"
          label="Add a reply..."
          value={content}
          inputProps={{
            maxLength: 200,
          }}
          onChange={handleContentChange}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginLeft: 1, height: '100%' }}
        >
          Reply
        </Button>
      </Box>
    </form>
  );
};

export default Reply;
