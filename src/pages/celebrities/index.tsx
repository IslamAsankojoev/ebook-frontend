import { api } from '@/api';
import Layout from '@/components/Layout';
import CelebritiesItem from '@/components/celebrities/CelebritiesItem';
import useRole from '@/hooks/useRole';
import useTypedSession from '@/hooks/useTypedSession';
import { NextPageAuth } from '@/types/auth.types';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

const celebrities: NextPageAuth = () => {
  const { data, status } = useTypedSession();
  const { isAuth, isAuthor, isNotAuth } = useRole();

  const { push } = useRouter();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const scroll = 'paper';

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      text: '',
    },
  });

  const {
    data: celebrities,
    isLoading,
    refetch,
  } = useQuery('celebrities', api.CelebrityService.findAll, {
    select: (data: ICelebrity[]) => data,
  });

  const { mutate } = useMutation(
    'create celebrity',
    (data: ICelebrity) => api.CelebrityService.create(data),
    {
      onSettled: () => {
        handleClose();
        refetch();
        reset();
      },
    },
  );

  const onSubmit = async (data: ICelebrity) => {
    mutate(data);
  };

  return (
    <Layout>
      <Box
        sx={{
          padding: '10px',
          backgroundColor: 'grey.400',
          borderRadius: '5px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5">Знаменитые личности</Typography>
        {isAuth && isAuthor && (
          <Button onClick={handleOpen} variant="contained">
            Добавить
          </Button>
        )}
      </Box>

      <br />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '20px 10px',
          width: '100%',
          flexWrap: 'wrap',
        }}
      >
        {celebrities?.map((celebrity) => (
          <CelebritiesItem celebrity={celebrity} refetchList={refetch} />
        ))}
      </Box>
      <Dialog
        sx={{
          backgroundSize: 'cover',
        }}
        open={open}
        onClose={handleClose}
        scroll={scroll}
      >
        <DialogTitle id="scroll-dialog-title">Добавить личность</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="name" variant="filled" fullWidth />
              )}
            />
            <Controller
              name="text"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="text" multiline rows={6} variant="filled" fullWidth />
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

export default celebrities;

celebrities.is_auth = true;
