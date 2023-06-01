import Layout from '@/components/Layout';
import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { api } from '@/api';
import Link from 'next/link';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import { NextPageAuth } from '@/types/auth.types';
import { useRouter } from 'next/router';

const Register: NextPageAuth = () => {
  useAuthRedirect();
  const { handleSubmit, control } = useForm({
    mode: 'onChange',
  });
  const { push } = useRouter();

  const { mutate, isLoading } = useMutation(
    'register',
    ({
      username,
      email,
      password,
      is_author,
    }: {
      username: string;
      email: string;
      password: string;
      is_author: boolean;
    }) => api.AuthService.register(username, email, password, is_author),
  );

  const onSubmit = async (data: any) => {
    mutate(
      { ...data, is_author: false },
      {
        onSuccess: () => {
          push('/login');
        },
      },
    );
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
          <Typography variant="h5">Зарегистрироваться</Typography>
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
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="email" variant="filled" fullWidth />
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

            <Button variant="contained" type="submit" fullWidth>
              Submit
            </Button>
          </form>
          <br />
          <Link
            href="/login"
            style={{
              textDecoration: 'none',
            }}
          >
            <Typography color="secondary.main">Войти</Typography>
          </Link>
        </Box>
      </Box>
    </Layout>
  );
};

export default Register;

Register.is_not_auth = true;
