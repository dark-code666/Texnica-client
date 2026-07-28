import React, { useState } from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, AppBar, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

import Sidebar from './components/Sidebar';
import Admin from './pages/Admin';
import AdminUsuarios from './pages/AdminUsuarios';
import AdminRoles from './pages/AdminRoles';
import AdminClientes from './pages/AdminClientes';
import Production from './pages/Production';
import PurchaseOrder from './pages/PurchaseOrder';
import CreatePO from './pages/CreatePO';
import Dashboard from './pages/Dashboard';
import { DataProvider } from './context/DataContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0f4c81', // Classic Blue
      light: '#e6f0fa',
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#f3f4f6',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'white',
          color: 'text.primary',
          boxShadow: 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            ERP Zona Franca
          </Typography>
          <IconButton color="primary">
            <NotificationsIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>A</Avatar>
            <Typography variant="body2" sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}>
              Admin User
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />
      </Box>
      
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DataProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="admin" element={<Admin />} />
              <Route path="admin/usuarios" element={<AdminUsuarios />} />
              <Route path="admin/roles" element={<AdminRoles />} />
              <Route path="admin/clientes" element={<AdminClientes />} />
              <Route path="production" element={<Production />} />
              <Route path="po/new" element={<CreatePO />} />
              <Route path="po/:id" element={<PurchaseOrder />} />
              <Route path="po/demo" element={<PurchaseOrder />} />
            </Route>
          </Routes>
        </HashRouter>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
