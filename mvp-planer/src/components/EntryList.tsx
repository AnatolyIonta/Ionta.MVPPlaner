import React from 'react';
import { Grid } from '@mui/material';
import EntryComponent from './Entry';
import { Entry } from '../types';

interface EntryListProps {
  entries: Entry[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
}

const EntryList: React.FC<EntryListProps> = ({ entries, onEdit, onDelete, onView }) => {
  return (
    <Grid container spacing={2}>
      {entries.map(entry => (
        <Grid item xs={12} key={entry.id}>
          <EntryComponent entry={entry} onEdit={onEdit} onDelete={onDelete} onView={onView} />
        </Grid>
      ))}
    </Grid>
  );
};

export default EntryList;