import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, AppBar, Toolbar, IconButton, Paper } from '@mui/material';
import { Entry, FilterOptions } from './types';
import { getAllEntries, addEntry, updateEntry, deleteEntry } from './db';
import EntryList from './components/EntryList';
import AddEditEntryForm from './components/AddEditEntryForm';
import EntryFilter from './components/EntryFilter';
import Modal from './components/Modal';
import ReactMarkdown from 'react-markdown';
import MenuIcon from '@mui/icons-material/Menu';

const App: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);
  const [viewingEntry, setViewingEntry] = useState<Entry | null>(null);
  const [filteredEntries, setFilteredEntries] = useState<Entry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    const fetchEntries = async () => {
      const entries = await getAllEntries();
      setEntries(entries);
      setFilteredEntries(entries);
    };
    fetchEntries();
  }, []);

  const handleAddEditEntry = async (entry: Entry) => {
    if (entry.id) {
      await updateEntry(entry);
      const updatedEntries = entries.map(e => e.id === entry.id ? entry : e);
      setEntries(updatedEntries);
      setFilteredEntries(updatedEntries);
    } else {
      const id = await addEntry(entry);
      const newEntry = { ...entry};
      newEntry.id = Number(id);
      setEntries([...entries, newEntry]);
      setFilteredEntries([...entries, newEntry]);
    }
    setEditingEntry(null);
    setIsModalOpen(false);
  };

  const handleEditEntry = (id: number) => {
    const entryToEdit = entries.find(e => e.id === id);
    if (entryToEdit) {
      setEditingEntry(entryToEdit);
      setIsModalOpen(true);
    }
  };

  const handleDeleteEntry = async (id: number) => {
    await deleteEntry(id);
    const updatedEntries = entries.filter(e => e.id !== id);
    setEntries(updatedEntries);
    setFilteredEntries(updatedEntries);
  };

  const handleFilter = ({ date, tags, search }: FilterOptions) => {
    let filtered = entries;
    if (search && search.length > 0) {
      filtered = filtered.filter(e => e.title.toLowerCase().includes(search.toLowerCase()) || e.content.toLowerCase().includes(search.toLowerCase()));
    }
    if (tags && tags.length > 0) {
      filtered = filtered.filter(e => tags.every(tag => e.tags.includes(tag)));
    }
    setFilteredEntries(filtered);
  };

  const handleOpenModal = () => {
    setEditingEntry(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleViewEntry = (id: number) => {
    const entryToView = entries.find(e => e.id === id);
    if (entryToView) {
      setViewingEntry(entryToView);
      setIsViewModalOpen(true);
    }
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Сервис для хранения аналитических данных
          </Typography>
          <Button color="inherit" onClick={handleOpenModal}>Добавить статью</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            Статьи
          </Typography>
          <EntryFilter onFilter={handleFilter} />
          <EntryList entries={filteredEntries} onEdit={handleEditEntry} onDelete={handleDeleteEntry} onView={handleViewEntry} />
        </Paper>
      </Container>
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} title="Добавить/Редактировать статью">
        <AddEditEntryForm onSubmit={handleAddEditEntry} initialData={editingEntry || undefined} />
      </Modal>
      <Modal isOpen={isViewModalOpen} onRequestClose={handleCloseViewModal} title="Просмотр статьи">
        {viewingEntry && (
          <Box>
            <Typography variant="h5">{viewingEntry.title}</Typography>
            <ReactMarkdown>{viewingEntry.content}</ReactMarkdown>
            <Typography variant="body2" color="text.secondary">Дата создания: {viewingEntry.date}</Typography>
            <Typography variant="body2" color="text.secondary">Теги: {viewingEntry.tags}</Typography>
          </Box>
        )}
      </Modal>
    </div>
  );
};

export default App;