import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
  Box,
} from '@mui/material';
import yaml from 'js-yaml';

const BallotList = ({
  dataUrl = '/ballot_2026.yaml',
  title = 'San Francisco — June 2, 2026 Primary',
  subtitle = 'A plain-language guide to everything on your ballot — just the facts and the arguments on every side. No recommendations.',
  propBase = '/2026/proposition',
  raceBase = '/2026/race',
  archiveLink = { to: '/2024', label: 'Looking for the November 2024 guide? →' },
}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(dataUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        const data = yaml.load(text);
        setItems(Array.isArray(data) ? data : data.items || []);
      })
      .catch((error) => {
        console.error('Error loading ballot file:', error);
      });
  }, [dataUrl]);

  if (!items.length) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <div>Loading...</div>
      </Container>
    );
  }

  const measures = items.filter((i) => i.type === 'proposition');
  const races = items.filter((i) => i.type === 'race');

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        {subtitle}{' '}
        <Link to="/methodology">How this was researched →</Link>
      </Typography>

      {races.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 3 }}>
            Candidates &amp; Offices
          </Typography>
          <List>
            {races.map((race) => (
              <ListItemButton
                component={Link}
                to={`${raceBase}/${race.id}`}
                key={race.id}
              >
                <ListItemText
                  primary={race.office}
                  secondary={race.election_type}
                />
              </ListItemButton>
            ))}
          </List>
        </>
      )}

      {measures.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 3 }}>
            Ballot Measures
          </Typography>
          <List>
            {measures.map((prop) => (
              <ListItemButton
                component={Link}
                to={`${propBase}/${prop.id}`}
                key={prop.id}
              >
                <ListItemText primary={prop.name} />
              </ListItemButton>
            ))}
          </List>
        </>
      )}

      {archiveLink && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant="body2">
            <Link to={archiveLink.to}>{archiveLink.label}</Link>
          </Typography>
        </>
      )}

      <Box sx={{ height: 40 }} />
    </Container>
  );
};

export default BallotList;
