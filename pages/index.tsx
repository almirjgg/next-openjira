import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import { Layout } from '../components/layouts';

interface Props {}

const HomePage: NextPage<Props> = ({}) => {
  return (
    <Layout>
      <Typography variant='h1' color='primary'>
        Home
      </Typography>
    </Layout>
  );
};

export default HomePage;
