import Layout from '@/components/Layout';
import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { api } from '@/api';

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
    mutate({ ...data, is_author: false });
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
        </Box>
      </Box>
    </Layout>
  );
};

export default Login;
