import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import PropositionsList from './components/PropositionsList';
import PropositionDetail from './components/PropositionDetail';
import About from './About';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
