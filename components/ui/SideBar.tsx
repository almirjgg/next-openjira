import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { useContext } from 'react';
import { UIContext } from '../../context/ui';
const menuItems: string[] = ['Inbox', 'Starred', 'Send email', 'Drafts'];
interface Props {}
export const SideBar: React.FC<Props> = () => {
  const { sideMenuOpen, closeSideMenu } = useContext(UIContext);
  return (
    <Drawer anchor='left' open={sideMenuOpen} onClose={closeSideMenu}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: '5px 10px' }}>
          <Typography variant='h4'>Menu</Typography>
        </Box>
        <List>
          {menuItems.map((text, index) => (
            <ListItem key={text}>
              <ListItemIcon>
                {index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {menuItems.map((text, index) => (
            <ListItem key={text}>
              <ListItemIcon>
                {index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
