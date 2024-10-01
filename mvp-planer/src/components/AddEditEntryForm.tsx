import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Entry } from '../types';

interface AddEditEntryFormProps {
  onSubmit: (entry: Entry) => void;
  initialData?: Entry;
}

const AddEditEntryForm: React.FC<AddEditEntryFormProps> = ({ onSubmit, initialData = {} as Entry }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Entry>({
    defaultValues: initialData,
  });

  const onFormSubmit = (data: Entry) => {
    onSubmit({
      ...data,
      id: initialData.id || Date.now(),
      date: new Date().toLocaleString(),
      tags: data.tags,
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <TextField
        fullWidth
        label="Заголовок"
        {...register('title', { required: 'Заголовок обязателен' })}
        error={!!errors.title}
        helperText={errors.title?.message}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Текст в формате Markdown"
        {...register('content', { required: 'Текст обязателен' })}
        error={!!errors.content}
        helperText={errors.content?.message}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        fullWidth
        label="Теги (через запятую)"
        {...register('tags')}
        sx={{ marginBottom: 2 }}
      />
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6">Предпросмотр:</Typography>
        <ReactMarkdown
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <SyntaxHighlighter language={match[1]} PreTag="div">
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {initialData.content || ''}
        </ReactMarkdown>
      </Box>
      <Button type="submit" variant="contained" color="primary">
        {initialData.id ? 'Сохранить' : 'Добавить'}
      </Button>
    </form>
  );
};

export default AddEditEntryForm;