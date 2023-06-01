import Layout from '@/components/Layout';
import { NextPageAuth } from '@/types/auth.types';
import { Box } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const Home: NextPageAuth = () => {
  const { data, status } = useSession();

  return (
    <>
      <Layout>
        <Box></Box>
      </Layout>
    </>
  );
};

export default Home;

Home.is_auth = true;
