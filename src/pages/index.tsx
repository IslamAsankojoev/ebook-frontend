import Layout from '@/components/Layout';
import { NextPageAuth } from '@/types/auth.types';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home: NextPageAuth = () => {
  const router = useRouter();

  return (
    <>
      <Layout>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80%',
            gap: '20px',
            margin: '0 auto',
            width: '350px',
            max: '100%',
          }}
        >
          <Grid>
            <Card
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'grey.400',
                },
              }}
              onClick={() => {
                router.push('/books');
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Книги
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  На этой странице вы найдете описания книг, которые вы можете прочитать или же если
                  вы автор можете добавить свою книгу
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid>
            <Card
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'grey.400',
                },
              }}
              onClick={() => {
                router.push('/celebrities');
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Знамениты личности
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  На этой странице вы найдете описания знаменитых личностей, которые вам могут быть
                  интересны, а так же вы можете добавить свою личность если вы автор
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default Home;

Home.is_auth = true;
