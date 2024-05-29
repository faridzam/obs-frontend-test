import { colors } from '@/constants/colors';
import { SupervisorAccount } from '@mui/icons-material';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

interface ISidebarProps {
  toggleDrawer?: (val: boolean) => void;
}

const Sidebar = (props: ISidebarProps) => {
  const { toggleDrawer = () => {} } = props;
  return (
    <Box
      role="presentation"
      onClick={() => toggleDrawer(false)}
      sx={{
        height: '100%',
        width: '100%',
        minWidth: '250px',
        backgroundColor: colors.white.main,
        paddingTop: '104px',
      }}
    >
      <List>
        {['Users'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon
                sx={{ color: `${colors.primary.light} !important` }}
              >
                <SupervisorAccount />
              </ListItemIcon>
              <ListItemText>
                <Typography color={colors.primary.light} variant="h6">
                  {text}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
