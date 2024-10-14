import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import { initGA, logPageView } from './services/analytics';
import PropositionsList from './components/PropositionsList';
import PropositionDetail from './components/PropositionDetail';
import About from './About';

function App() {
  // Initialize Google Analytics once when the app loads
  useEffect(() => {
    initGA();
  }, []);

  // Component to track route changes
  const RouteChangeTracker = () => {
    const location = useLocation();

    useEffect(() => {
      logPageView();
    }, [location]);

    return null;
  };

  return (
    <Router>
      <RouteChangeTracker />
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
