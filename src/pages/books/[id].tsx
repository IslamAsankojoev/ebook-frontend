import { api } from '@/api';
import Layout from '@/components/Layout';
import PageItemDialog from '@/components/pages/PageItemDialog';
import useRole from '@/hooks/useRole';
import { NextPageAuth } from '@/types/auth.types';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Pagination,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

const Book: NextPageAuth = () => {
  const { isAuth, isAuthor, isNotAuth } = useRole();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openBook, setOpenBook] = useState(false);
  const [page, setPage] = useState(1);
  const [pageContent, setPageContent] = useState({
    chapter: '',
    content: '',
  });

  const handleClose = () => {
    setOpen(false);
  };
  const scroll = 'paper';

  const { mutate, isLoading } = useMutation(
    'update book',
    // @ts-ignore
    (data: IBook) => api.BookService.update(router.query.id, data),
    {
      onSettled: () => {
        refetch();
      },
    },
  );

  const { mutate: mutatePage } = useMutation(
    'create page',
    (data: IPage) => api.PageService.create(data),
    {
      onSettled: () => {
        refetch();
        setOpen(false);
        reset();
      },
    },
  );

  const { mutate: deleteMutate } = useMutation(
    'delete book',
    // @ts-ignore
    () => api.BookService.delete(router.query.id),
    {
      onSettled: () => {
        router.push('/books');
      },
    },
  );

  const handleDelete = () => {
    if (confirm('Подтвердите удаление книги')) {
      deleteMutate();
    }
  };

  // @ts-ignore
  const { data: book, refetch } = useQuery('book', () => api.BookService.findOne(router.query.id), {
    enabled: !!router.query.id,
    select: (data: IBook) => data,
    refetchOnWindowFocus: false,
  });

  const handleCloseBook = () => {
    setOpenBook(false);
  };

  const onSubmit = async (data: any) => {
    mutatePage({
      ...data,
      // @ts-ignore
      book: router?.query?.id,
    });
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      chapter: '',
      content: '',
      book: router?.query?.id,
    },
  });

  useEffect(() => {
    if (book?.pages) {
      setPageContent(book.pages[page - 1]);
    }
  }, [book]);

  return (
    <>
      <Layout>
        <Box>
          <Box
            sx={{
              backgroundColor: 'secondary.main',
              padding: '20px',
              borderRadius: '5px',
              color: 'white',
              fontSize: '1.2rem',
              fontFamily: 'Arial',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              '& *': {
                outline: 'none',
              },
            }}
          >
            <h1 id="title" contentEditable={true}>
              {book?.title}
            </h1>
            <p id="description" contentEditable={true}>
              {book?.description}
            </p>
            <Box display="flex" gap={2} justifyContent="space-between">
              {/* {isAuthor && (
                <ToggleButtonGroup
                  color="info"
                  value={editing}
                  onChange={(e) => {
                    // @ts-ignore
                    setEditing(e.target.value);
                  }}
                  aria-label="Platform"
                >
                  <ToggleButton
                    sx={{
                      '&.MuiToggleButton-root': {
                        color: 'white',
                      },
                    }}
                    color="info"
                    value="write"
                    size="small"
                  >
                    Редактировать
                  </ToggleButton>
                  <ToggleButton
                    sx={{
                      '&.MuiToggleButton-root': {
                        color: 'white',
                      },
                    }}
                    color="info"
                    value="read"
                    size="small"
                  >
                    Просмотр
                  </ToggleButton>
                </ToggleButtonGroup>
              )} */}
              <Box display="flex" gap={2}>
                {isAuthor && (
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => {
                      handleDelete();
                    }}
                    size="small"
                  >
                    Удалить
                  </Button>
                )}
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    setOpenBook(true);
                  }}
                >
                  <Typography>Читать</Typography>
                </Button>
                {isAuthor && (
                  <LoadingButton
                    size="small"
                    onClick={() => {
                      mutate({
                        // @ts-ignore
                        id: router.query.id,
                        // @ts-ignore
                        title: document.querySelector('h1#title')?.textContent,
                        // @ts-ignore
                        description: document.querySelector('p#description')?.textContent,
                        // @ts-ignore
                        author: book?.author,
                      });
                    }}
                    loading={isLoading}
                    variant="contained"
                    color="success"
                  >
                    Сохранить
                  </LoadingButton>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <br />
        {isAuthor && (
          <Box gap={2}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '5px',
                backgroundColor: 'grey.400',
                borderRadius: '5px',
              }}
            >
              <Typography variant="h5">Все страницы</Typography>
              <Button
                variant="contained"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Добавить
              </Button>
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
              {book?.pages?.map((page) => (
                <PageItemDialog page={page} refetch={refetch} book={book} />
              ))}
            </Box>
          </Box>
        )}
      </Layout>
      <Dialog
        sx={{
          backgroundSize: 'cover',
        }}
        open={open}
        onClose={handleClose}
        scroll={scroll}
      >
        <DialogTitle id="scroll-dialog-title">Добавить cтраницу</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="chapter"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="chapter" variant="filled" fullWidth />
              )}
            />
            <Controller
              name="content"
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

      <Dialog
        sx={{
          backgroundSize: 'cover',
        }}
        open={openBook}
        onClose={handleCloseBook}
        scroll={scroll}
      >
        <DialogTitle id="scroll-dialog-title">
          {
            // @ts-ignore
            pageContent.chapter
          }
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText>
            <Typography>{pageContent.content}</Typography>
          </DialogContentText>
          <Pagination
            count={book?.pages?.length}
            onChange={(e, page) => {
              setPageContent({
                // @ts-ignore
                chapter: book?.pages[page - 1].chapter,
                // @ts-ignore
                content: book?.pages[page - 1].content,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBook}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Book;

Book.is_auth = true;
