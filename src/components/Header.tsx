import { Box, IconButton, Link, MenuItem, Typography } from '@mui/material';
import React, { FC } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import useTypedSession from '@/hooks/useTypedSession';

const Header: FC<{
  setOpenSidebar: (open: boolean) => void;
}> = ({ setOpenSidebar }) => {
  const { status, data } = useTypedSession();
  const { push } = useRouter();

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        backgroundColor: 'grey.500',
      }}
    >
      <IconButton
        onClick={() => {
          setOpenSidebar(true);
        }}
      >
        <MenuIcon
          sx={{
            color: 'white',
            fontSize: '30px',
          }}
        />
      </IconButton>
      <Typography
        sx={{
          color: 'white',
          display: 'inline-block',
          padding: '0px 10px',
          borderRadius: '5px',
          backgroundColor: 'secondary.main',
        }}
        variant="h6"
      >
        eBook{' '}
        <Box
          color="success.main"
          sx={{
            display: 'inline-block',
          }}
        >
          {data?.user?.username && `- ${data?.user?.username}`}
        </Box>
      </Typography>
      <Link
        onClick={() => {
          if (status === 'authenticated') {
            signOut();
          }
          if (status === 'unauthenticated') {
            push('/login');
          }
        }}
        sx={{
          textDecoration: 'none',
          display: 'inline-block',
        }}
      >
        <MenuItem
          sx={{
            color: 'white',
          }}
        >
          {status === 'authenticated' ? 'Выйти' : 'Войти'}
        </MenuItem>
      </Link>
    </Box>
  );
};

export default Header;
