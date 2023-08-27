import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SortOptions = ({ criteria, onChange }) => {
  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="sort-criteria">Sort by:</InputLabel>
      <Select
        label="Sort by:"
        value={criteria}
        onChange={(e) => onChange(e.target.value)}
        inputProps={{
          name: 'sortCriteria',
          id: 'sort-criteria',
        }}
      >
        <MenuItem value="date">Date</MenuItem>
        <MenuItem value="likes">Likes</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortOptions;
