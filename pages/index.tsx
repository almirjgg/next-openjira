import { NextPage } from 'next';
import Grid from '@mui/material/Grid2';
import { Card, CardHeader } from '@mui/material';
import { Layout } from '../components/layouts';

const HomePage: NextPage = () => {
  return (
    <Layout title='Home - OpenJira'>
      <Grid container rowSpacing={1} columnSpacing={1}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Pending' />
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='In progress' />
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Completed' />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};
export default HomePage;
