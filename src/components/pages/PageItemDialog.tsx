import { api } from '@/api';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import CloseIcon from '@mui/icons-material/Close';
import useRole from '@/hooks/useRole';
const PageItemDialog: FC<{
  page: IPage;
  refetch: () => void;
  book: IBook;
}> = ({ page, refetch, book }) => {
  const [open, setOpen] = useState(false);
  const { isAuth, isAuthor, isNotAuth } = useRole();

  const handleClose = () => {
    setOpen(false);
  };

  const scroll = 'paper';

  const { mutate, isLoading } = useMutation(
    'update page item',
    // @ts-ignore
    (data: IPage) => api.PageService.update(page?.id, data),
    {
      // @ts-ignore
      enabled: page?.id,
      onSettled: () => {
        handleClose();
        refetch();
      },
    },
  );
  const { mutate: mutateDelete } = useMutation(
    'delete page item',
    // @ts-ignore
    () => api.PageService.delete(page?.id),
    {
      // @ts-ignore
      enabled: page?.id,
      onSettled: () => {
        handleClose();
        refetch();
      },
    },
  );

  const { control, handleSubmit, reset } = useForm({
    defaultValues: page,
  });

  const onSubmit = (data: IPage) => {
    mutate({
      ...data,
      // @ts-ignore
      book: book.id,
    });
  };
  return (
    <>
      <Card
        onClick={() => {
          setOpen(true);
        }}
        sx={{
          cursor: 'pointer',
          borderRadius: '5px',
          height: '220px',
          overflow: 'hidden',
          backgroundColor: 'secondary.main',
          position: 'relative',
        }}
      >
        {isAuthor && (
          <IconButton
            onClick={() => {
              mutateDelete();
            }}
            sx={{
              position: 'absolute',
              right: '0',
              top: '0',
            }}
          >
            <CloseIcon color="error" />
          </IconButton>
        )}
        {page.chapter && (
          <Typography
            variant="h6"
            color="white"
            sx={{
              backgroundColor: 'secondary.dark',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            {page.chapter}
          </Typography>
        )}
        <Typography
          sx={{
            padding: '10px',
          }}
          color="white"
        >
          {page.content.slice(0, 160) + '...'}
        </Typography>
      </Card>

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
    </>
  );
};

export default PageItemDialog;
