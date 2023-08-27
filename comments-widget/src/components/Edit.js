import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const Edit = ({ commentId, prevContent, onClickEdit }) => {
  const [content, setContent] = useState(prevContent);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onClickEdit(commentId,content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" alignItems="flex-end">
        <TextField
          multiline
          rows={3}
          variant="outlined"
          label="Edit comment..."
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
          Edit
        </Button>
      </Box>
    </form>
  );
};

export default Edit;
