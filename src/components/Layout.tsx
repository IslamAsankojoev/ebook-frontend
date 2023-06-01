import { Box, Drawer } from '@mui/material';
import React, { FC, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useSession } from 'next-auth/react';

const Layout: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const { status, data } = useSession();

  const [overflowY, setOverflowY] = React.useState('auto');

  useEffect(() => {
    if (openSidebar) {
      setOverflowY('hidden');
    } else {
      setOverflowY('auto');
    }
  }, [openSidebar]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '20px',
      }}
    >
      <Box
        sx={{
          borderRadius: '20px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          height: '100%',
          overflow: 'hidden',
          overflowY: overflowY,
          width: '1000px',
          maxWidth: '100%',
          backgroundColor: 'grey.500',
          padding: '0px',
          position: 'relative',
        }}
      >
        <Header setOpenSidebar={setOpenSidebar} />

        <Sidebar open={openSidebar} setOpen={setOpenSidebar} />
        <Box
          sx={{
            height: '100%',
            padding: '20px!important',
            position: 'relative',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
