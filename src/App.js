import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import PropositionsList from './components/PropositionsList';
import PropositionDetail from './components/PropositionDetail';

function App() {
  return (
    <Router>
      <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Normal Government</Typography>
          </Toolbar>
      </AppBar> 
      <Routes>
        <Route path="/" element={<PropositionsList />} />
        <Route path="/proposition/:id" element={<PropositionDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
