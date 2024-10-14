// src/App.js

import React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom'; // Remove BrowserRouter
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import { initGA, logPageView } from './services/analytics';
import PropositionsList from './components/PropositionsList';
import PropositionDetail from './components/PropositionDetail';
import About from './About';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA when the app mounts
    initGA();
  }, []);

  useEffect(() => {
    // Log page views on route changes
    logPageView();
  }, [location]);

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar disableGutters>
            {/* Navigation Links */}
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            <Button component={Link} to="/about" color="inherit">
              About
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Routes>
        <Route path="/" element={<PropositionsList />} />
        <Route path="/about" element={<About />} />
        <Route path="/proposition/:id" element={<PropositionDetail />} />
      </Routes>
    </>
  );
}

export default App;
