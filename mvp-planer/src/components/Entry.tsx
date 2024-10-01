import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Entry } from '../types';

interface EntryProps {
  entry: Entry;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
}

const EntryComponent: React.FC<EntryProps> = ({ entry, onEdit, onDelete, onView }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {entry.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Дата создания: {entry.date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Теги: {entry.tags}
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={() => onEdit(entry.id)}>Редактировать</Button>
          <Button variant="contained" color="secondary" onClick={() => onDelete(entry.id)} sx={{ marginLeft: 1 }}>Удалить</Button>
          <Button variant="contained" color="info" onClick={() => onView(entry.id)} sx={{ marginLeft: 1 }}>Просмотр</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EntryComponent;