import { api } from '@/api';
import Layout from '@/components/Layout';
import useRole from '@/hooks/useRole';
import useTypedSession from '@/hooks/useTypedSession';
import { NextPageAuth } from '@/types/auth.types';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import router from 'next/router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

const books: NextPageAuth = () => {
  const { isAuth, isAuthor, isNotAuth } = useRole();
  const { data: session, status } = useTypedSession();
  const [open, setOpen] = useState(false);

  const { data: books, refetch } = useQuery('books', api.BookService.findAll, {
    select: (data: IBook[]) => data,
  });

  const scroll = 'paper';

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate, isLoading } = useMutation(
    'create book',
    (data: IBook) => api.BookService.create(data),
    {
      onSettled: () => {
        handleClose();
        refetch();
      },
    },
  );

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: '',
      description: '',
      author: session?.user?.id,
    },
  });

  const onSubmit = async (data: IBook) => {
    mutate({
      ...data,
      author: session?.user?.id,
    });
  };

  return (
    <Layout>
      <Box gap={2}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
            backgroundColor: 'grey.400',
            borderRadius: '5px',
          }}
        >
          <Typography variant="h5">Все книги</Typography>
          {isAuthor && (
            <Button
              onClick={() => {
                setOpen(true);
              }}
              variant="contained"
            >
              Добавить
            </Button>
          )}
        </Box>
        <br />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            '@media (max-width: 1024px)': {
              gridTemplateColumns: 'repeat(2, 1fr)',
            },
            '@media (max-width: 768px)': {
              gridTemplateColumns: 'repeat(1, 1fr)',
            },
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: '20px',
          }}
        >
          {books?.map((book) => (
            <Card
              onClick={() => router.push(`/books/${book.id}`)}
              sx={{
                cursor: 'pointer',
                borderRadius: '5px',
                height: '220px',
                overflow: 'hidden',
                backgroundColor: 'secondary.main',
              }}
            >
              <Typography
                variant="h6"
                color="white"
                sx={{
                  backgroundColor: 'secondary.dark',
                  padding: '10px',
                  borderRadius: '5px',
                }}
              >
                {book.title}
              </Typography>
              <Typography
                sx={{
                  padding: '10px',
                }}
                color="white"
              >
                {book.description.slice(0, 160) + '...'}
              </Typography>
            </Card>
          ))}
        </Box>
      </Box>
      <Dialog
        sx={{
          backgroundSize: 'cover',
        }}
        open={open}
        onClose={handleClose}
        scroll={scroll}
      >
        <DialogTitle id="scroll-dialog-title">Добавить книгу</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="title" variant="filled" fullWidth />
              )}
            />
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="description"
                  multiline
                  rows={6}
                  variant="filled"
                  fullWidth
                />
              )}
            />

            <LoadingButton variant="contained" type="submit" fullWidth loading={isLoading}>
              Добавить
            </LoadingButton>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default books;

books.is_auth = true;
