import Layout from '@/components/Layout';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { api } from '@/api';
import { LoadingButton } from '@mui/lab';
import { signIn, useSession } from 'next-auth/react';
import axios from 'axios';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import Link from 'next/link';
import { NextPageAuth } from '@/types/auth.types';

const Login: NextPageAuth = () => {
  // useAuthRedirect();
  const { data, status } = useSession();

  const { handleSubmit, control } = useForm({
    mode: 'onChange',
  });

  const { mutate, isLoading } = useMutation(
    'login',
    ({ username, password }: { username: string; password: string }) =>
      api.AuthService.login(username, password),
  );

  const onSubmit = async (data: any) => {
    await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    });
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
              width: '340px',
            }}
          >
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Логин" variant="filled" fullWidth />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Пароль" variant="filled" fullWidth />
              )}
            />

            <LoadingButton variant="contained" type="submit" fullWidth loading={isLoading}>
              Войти
            </LoadingButton>
          </form>
          <br />
          <Link
            href="/register"
            style={{
              textDecoration: 'none',
            }}
          >
            <Typography color="secondary.main">Регистрация</Typography>
          </Link>
        </Box>
      </Box>
    </Layout>
  );
};

export default Login;

Login.is_not_auth = true;
