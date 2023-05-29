import { Box, IconButton, Typography } from '@mui/material';
import React, { FC } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

const Header: FC<{
  setOpenSidebar: (open: boolean) => void;
}> = ({ setOpenSidebar }) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 30px',
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
        variant="h4"
      >
        eBook
      </Typography>
      <Link href="/login">
        <Typography
          sx={{
            color: 'white',
          }}
        >
          Выйти
        </Typography>
      </Link>
    </Box>
  );
};

export default Header;
