// src/App.js

import React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom'; // Remove BrowserRouter
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import { initGA, logPageView } from './services/analytics';
import PropositionsList from './components/PropositionsList';
import PropositionDetail from './components/PropositionDetail';
import BallotList from './components/BallotList';
import RaceDetail from './components/RaceDetail';
import About from './About';
import Methodology from './Methodology';

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
              June 2026
            </Button>
            <Button component={Link} to="/2024" color="inherit">
              2024
            </Button>
            <Button component={Link} to="/methodology" color="inherit">
              Method
            </Button>
            <Button component={Link} to="/about" color="inherit">
              About
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Routes>
        {/* June 2, 2026 primary (current) */}
        <Route path="/" element={<BallotList />} />
        <Route
          path="/2026/proposition/:id"
          element={<PropositionDetail dataUrl="/ballot_2026.yaml" basePath="/2026/proposition" />}
        />
        <Route
          path="/2026/race/:id"
          element={<RaceDetail dataUrl="/ballot_2026.yaml" listLink="/" />}
        />

        {/* November 2024 archive */}
        <Route path="/2024" element={<PropositionsList />} />
        <Route path="/proposition/:id" element={<PropositionDetail />} />

        <Route path="/methodology" element={<Methodology />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
