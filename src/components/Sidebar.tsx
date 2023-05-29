import { Box, MenuItem, Drawer, IconButton } from '@mui/material';
import React, { FC, useEffect } from 'react';
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';

const routes = [
  {
    name: 'Главная',
    path: '/',
    role: 'is_auth',
  },
  {
    name: 'Книги',
    path: '/books',
    role: 'is_auth',
  },
  {
    name: 'Знаменитые личности',
    path: '/celebrities',
    role: 'is_auth',
  },
  {
    name: 'line',
    path: '',
  },
  {
    name: 'Войти',
    path: '/login',
    role: 'is_not_auth',
  },
  {
    name: 'Регистрация',
    path: '/register',
    role: 'is_not_auth',
  },
];

const Sidebar: FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
  const [openSidebar, setOpenSidebar] = React.useState(false);

  useEffect(() => {
    setOpenSidebar(open);
  }, [open]);

  return (
    <Box
      sx={{
        transition: 'all 0.3s ease',
        opacity: openSidebar ? '1' : '0',
        zIndex: openSidebar ? '10' : '-1',
        position: 'absolute',
        top: '0',
        left: '0',
        bottom: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target === e.currentTarget) {
          setOpen(false);
        }
      }}
    >
      <Box
        sx={{
          transition: 'all 0.3s ease',
          transform: openSidebar ? 'translateX(0)' : 'translateX(-100%)',
          position: 'absolute',
          top: '0',
          left: '0',
          bottom: '0',
          width: '250px',
          backgroundColor: 'grey.400',
          padding: '20px 10px',
        }}
      >
        <Box
          sx={{
            width: '100%',
            position: 'relative',
            height: '0px',
          }}
        >
          <IconButton
            onClick={() => {
              setOpen(false);
            }}
            sx={{
              position: 'absolute',
              top: '20px',
              right: '0px',

              transform: 'translate(150%, -50%)',
            }}
          >
            <CloseIcon
              sx={{
                color: 'white',
                fontSize: '30px',
              }}
            />
          </IconButton>
        </Box>
        {routes.map((route) => {
          if (route.name === 'line') {
            return <hr style={{ border: '2px solid secondary.main' }} />;
          }
          return (
            <Link
              key={route.name + route.path}
              href={route.path}
              style={{
                textDecoration: 'none',
              }}
            >
              <MenuItem
                sx={{
                  color: 'secondary.main',
                  borderRadius: '5px',
                }}
              >
                {route.name}
              </MenuItem>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
};

export default Sidebar;
