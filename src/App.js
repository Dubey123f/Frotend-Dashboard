import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, AppBar, Toolbar, Button } from '@mui/material';
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';
import Login from './pages/Login';
import Registration from './pages/Registration';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* <AppBar position="static">
          <Toolbar>
            <Button color="inherit" href="/u">
              Users
            </Button>
            <Button color="inherit" href="/roles">
              Roles
            </Button>
          </Toolbar>
        </AppBar> */}
        <Navigation/>
        <Container>
{/* <Navigation/> */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/roles" element={<RoleManagement />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/d" element={<Dashboard />} />
            <Route path="/u" element={<UserManagement />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;