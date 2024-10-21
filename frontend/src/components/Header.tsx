import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
// @ts-ignore
import { AuthContext } from '../contexts/AuthContext';

const Header: React.FC = () => {
    // @ts-ignore
    const { isAuthenticated, logout } = useContext(AuthContext);
  
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            AI-powered BI Dashboard
          </Typography>
          {isAuthenticated ? (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" href="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    );
  };
  
  export default Header;