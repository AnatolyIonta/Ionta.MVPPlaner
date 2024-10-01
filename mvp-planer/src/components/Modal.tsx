import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  title?: string;
  onSave?: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onRequestClose, children, title, onSave }) => {
  return (
    <Dialog open={isOpen} onClose={onRequestClose} fullWidth maxWidth="md">
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      {onSave && (
        <DialogActions>
          <Button onClick={onRequestClose} color="primary">
            Закрыть
          </Button>
          <Button onClick={onSave} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;