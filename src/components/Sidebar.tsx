import React, { useState, useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Toolbar, Typography, Box, Collapse, SxProps, Theme, Divider,
  Avatar,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import FactoryIcon from '@mui/icons-material/PrecisionManufacturing';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PeopleIcon from '@mui/icons-material/People';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import SecurityIcon from '@mui/icons-material/Security';
import BusinessIcon from '@mui/icons-material/Business';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../context/AuthContext';

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  drawerWidth: number;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle, drawerWidth }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [adminOpen, setAdminOpen] = useState<boolean>(location.pathname.startsWith('/admin'));

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname === path;

  const itemStyle = (active: boolean): SxProps<Theme> => ({
    backgroundColor: active ? 'rgba(255,255,255,0.15)' : 'transparent',
    borderLeft: active ? '4px solid white' : '4px solid transparent',
    '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
    pl: 2,
  });

  const subItemStyle = (active: boolean): SxProps<Theme> => ({
    backgroundColor: active ? 'rgba(255,255,255,0.15)' : 'transparent',
    borderLeft: active ? '4px solid rgba(255,255,255,0.8)' : '4px solid transparent',
    '&:hover': { backgroundColor: 'rgba(255,255,255,0.15)' },
    pl: 5,
    py: 0.8,
  });

  const adminSubItems = [
    { text: 'Users',           icon: <PeopleIcon fontSize="small" />,   path: '/admin/usuarios' },
    { text: 'Roles & Permissions',icon: <SecurityIcon fontSize="small" />, path: '/admin/roles' },
    { text: 'Clients',         icon: <BusinessIcon fontSize="small" />, path: '/admin/clientes' },
  ];

  const isAdminActive = location.pathname.startsWith('/admin');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Get first letter of username for avatar
  const avatarLetter = user?.userName?.charAt(0).toUpperCase() || 'U';

  const drawer = (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
          TPCS Texnica Production Control System
        </Typography>
      </Toolbar>

      {/* Navigation items */}
      <List disablePadding sx={{ flex: 1 }}>
        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="/" sx={itemStyle(isActive('/'))}>
            <ListItemIcon sx={{ color: 'white' }}><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => setAdminOpen(!adminOpen)} sx={itemStyle(isAdminActive)}>
            <ListItemIcon sx={{ color: 'white' }}><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Administration" />
            {adminOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
        </ListItem>

        <Collapse in={adminOpen} timeout="auto" unmountOnExit>
          <List disablePadding>
            {adminSubItems.map((sub) => (
              <ListItem key={sub.text} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={sub.path}
                  sx={subItemStyle(isActive(sub.path))}
                >
                  <ListItemIcon sx={{ color: 'rgba(255,255,255,0.85)', minWidth: 32 }}>
                    {sub.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography sx={{ fontSize: '0.85rem' }}>{sub.text}</Typography>}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="/production" sx={itemStyle(isActive('/production'))}>
            <ListItemIcon sx={{ color: 'white' }}><FactoryIcon /></ListItemIcon>
            <ListItemText primary="Production" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="/warehouse" sx={itemStyle(isActive('/warehouse'))}>
            <ListItemIcon sx={{ color: 'white' }}><WarehouseIcon /></ListItemIcon>
            <ListItemText primary="Warehouse" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="/po/demo" sx={itemStyle(isActive('/po/demo'))}>
            <ListItemIcon sx={{ color: 'white' }}><ReceiptIcon /></ListItemIcon>
            <ListItemText primary="PO (Demo)" />
          </ListItemButton>
        </ListItem>
      </List>

      {/* User info and logout at bottom */}
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.25)', width: 36, height: 36, mr: 1.5, fontSize: '1rem', fontWeight: 700 }}>
            {avatarLetter}
          </Avatar>
          <Box sx={{ overflow: 'hidden' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }} noWrap>
              {user?.userName || 'User'}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.7rem' }} noWrap>
              {user?.email || ''}
            </Typography>
          </Box>
        </Box>

        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.15)' },
            px: 1.5,
            py: 1,
          }}
        >
          <ListItemIcon sx={{ color: 'rgba(255,255,255,0.85)', minWidth: 34 }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography sx={{ fontSize: '0.875rem' }}>Logout</Typography>}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar;
