import Layout from '@/components/Layout';
import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { api } from '@/api';
import { LoadingButton } from '@mui/lab';

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const { mutate, isLoading } = useMutation(
    'login',
    ({ username, password }: { username: string; password: string }) =>
      api.AuthService.login(username, password),
    {
      onSuccess: (data) => {
        localStorage.setItem('token', data.access);
      },
    },
  );

  const onSubmit = async (data: any) => {
    mutate(data);
  };

  return (
    <Layout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80%',
        }}
      >
        <Box
          sx={{
            borderRadius: '10px',
            backgroundColor: 'grey.400',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h5">Войти</Typography>
          <br />
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              width: '300px',
            }}
          >
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="username" variant="filled" fullWidth />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="password" variant="filled" fullWidth />
              )}
            />

            <LoadingButton variant="contained" type="submit" fullWidth loading={isLoading}>
              Submit
            </LoadingButton>
          </form>
        </Box>
      </Box>
    </Layout>
  );
};

export default Login;
