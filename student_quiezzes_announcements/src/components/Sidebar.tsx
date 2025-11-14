import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { FileText, Home, LogOut, Menu, School } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { logoutUser } from '../store/slices/authSlice';

interface SidebarProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
  isMobile: boolean;
}

const drawerWidth = 280;

export function Sidebar({ mobileOpen, onDrawerToggle, isMobile }: SidebarProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/')
  };

  const menuItems = [
    { text: t('home'), icon: <Home size={24} />, action: () => <Navigate to="/" replace /> },
    { text: t('quizzes'), icon: <FileText size={24} />, action: () => { } },
    { text: t('announcements'), icon: <FileText size={24} />, action: () => { } },
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          p: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}

      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <School size={28} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {t('dashboard')}
        </Typography>
      </Box>

      <List sx={{ flexGrow: 1, px: 2, py: 3 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={item.action}
              sx={{
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'white',
                  color: '#667eea',
                  transform: 'translateX(8px)',
                  '& .MuiListItemIcon-root': {
                    color: '#667eea',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List sx={{ px: 2, py: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              color: '#f44336',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#ffebee',
                transform: 'translateX(8px)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
              <LogOut size={24} />
            </ListItemIcon>
            <ListItemText
              primary={t('logout')}
              primaryTypographyProps={{
                fontWeight: 500,
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={onDrawerToggle}
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700 }}>
              {t('dashboard')}
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={onDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                borderRight: 'none',
                boxShadow: '4px 0 20px rgba(0, 0, 0, 0.05)',
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>
    </>
  );
}
