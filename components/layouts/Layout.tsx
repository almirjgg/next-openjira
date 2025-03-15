import { Box } from '@mui/material';
import Head from 'next/head';
import { Navbar, SideBar } from '../ui';
interface Props {
  title?: string;
}
export const Layout: React.FC<Props> = ({ title = 'OpenJira', children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <SideBar />
      <Box sx={{ padding: '10px 20px' }}>{children}</Box>
    </Box>
  );
};
