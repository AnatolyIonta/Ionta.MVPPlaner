import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { FilterOptions } from '../types';

interface EntryFilterProps {
  onFilter: (filter: FilterOptions) => void;
}

const EntryFilter: React.FC<EntryFilterProps> = ({ onFilter }) => {
  const [date, setDate] = useState('');
  const [tags, setTags] = useState('');
  const [search, setSearch] = useState('');

  const handleFilter = () => {
    onFilter({
      date,
      tags: tags.length > 0 ? tags.split(',').map(tag => tag.trim()) : [],
      search,
    });
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <TextField
        label="Дата создания"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ marginRight: 2 }}
      />
      <TextField
        label="Теги (через запятую)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        sx={{ marginRight: 2 }}
      />
      <TextField
        label="Поиск"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginRight: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleFilter}>Найти</Button>
    </Box>
  );
};

export default EntryFilter;