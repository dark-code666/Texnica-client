import  { useState, useContext, useEffect } from 'react';

import { HashRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, AppBar, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import ChangePasswordModal from './components/ChangePasswordModal';

import Admin from './pages/Admin';
import AdminUsuarios from './pages/AdminUsuarios';
import AdminRoles from './pages/AdminRoles';
import AdminClientes from './pages/AdminClientes';
import AdminPermisos from './pages/AdminPermisos';
import Customers from './pages/Customers';
import Factories from './pages/Factories';
import Production from './pages/Production';
import Warehouse from './pages/Warehouse';
import PurchaseOrder from './pages/PurchaseOrder';
import CreatePO from './pages/CreatePO';
import Fgpo from './pages/Fgpo';
import FabricRequirement from './pages/FabricRequirement';
import FabricPO from './pages/FabricPO';
import MillProduction from './pages/MillProduction';
import MillTest from './pages/MillTest';
import FabricShipment from './pages/FabricShipment';



import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { DataProvider } from './context/DataContext';
import { AuthProvider, AuthContext } from './context/AuthContext';

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
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const avatarLetter = user?.userName?.charAt(0).toUpperCase() || 'U';

  // Mostrar el modal de cambio de contraseña automáticamente si el usuario debe cambiarla
  useEffect(() => {
    if (user?.mustChangePassword) {
      setChangePasswordOpen(true);
    }
  }, [user?.mustChangePassword]);


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <ChangePasswordModal
        open={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
      />

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
            TPCS Texnica Production Control System
          </Typography>
          <IconButton color="primary">
            <NotificationsIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontSize: '0.875rem', fontWeight: 700 }}>
              {avatarLetter}
            </Avatar>
            <Typography variant="body2" sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}>
              {user?.userName || 'User'}
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
      <AuthProvider>
        <DataProvider>
          <HashRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="admin" element={<Admin />} />
                  <Route path="admin/usuarios" element={<AdminUsuarios />} />
                  <Route path="admin/roles" element={<AdminRoles />} />
                  <Route path="admin/clientes" element={<AdminClientes />} />
                  <Route path="admin/permisos" element={<AdminPermisos />} />
                  <Route path="admin/customers" element={<Customers />} />
                  <Route path="admin/factories" element={<Factories />} />
                  <Route path="production" element={<Production />} />

                  <Route path="fgpo" element={<Fgpo />} />
                  <Route path="fabric-requirement" element={<FabricRequirement />} />
                  <Route path="fabric-po" element={<FabricPO />} />
                  <Route path="mill-production" element={<MillProduction />} />
                  <Route path="mill-test" element={<MillTest />} />
                  <Route path="fabric-shipment" element={<FabricShipment />} />
                  <Route path="warehouse" element={<Warehouse />} />


                  <Route path="po/new" element={<CreatePO />} />
                  <Route path="po/:id" element={<PurchaseOrder />} />
                  <Route path="po/demo" element={<PurchaseOrder />} />
                </Route>
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </HashRouter>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
