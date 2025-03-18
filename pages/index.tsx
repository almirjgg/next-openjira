import { NextPage } from 'next';
import Grid from '@mui/material/Grid2';
import { Card, CardContent, CardHeader } from '@mui/material';
import { Layout } from '../components/layouts';
import { EntryList, NewEntry } from '../components/ui';

const HomePage: NextPage = () => {
  return (
    <Layout title='Home - OpenJira'>
      <Grid container rowSpacing={1} columnSpacing={1}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Pending' />
            <NewEntry />
            {/* Add new entries */}
            <EntryList status='pending' />
            {/* List of entries */}
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='In progress' />
            <EntryList status='in-progress' />
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Completed' />
            <EntryList status='completed' />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};
export default HomePage;
