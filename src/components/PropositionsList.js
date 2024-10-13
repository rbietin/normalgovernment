import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, List, ListItemButton, ListItemText } from '@mui/material';
import yaml from 'js-yaml';

const PropositionsList = () => {
  const [propositions, setPropositions] = useState([]);

  useEffect(() => {
    fetch('/propositions.yaml')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((text) => {
        const data = yaml.load(text);
        setPropositions(data);
      })
      .catch((error) => {
        console.error('Error loading YAML file:', error);
      });
  }, []);

  if (!propositions.length) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <div>Loading...</div>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <List>
        {propositions.map((prop) => (
          <ListItemButton
            component={Link}
            to={`/proposition/${prop.id}`}
            key={prop.id}
          >
            <ListItemText primary={prop.name} />
          </ListItemButton>
        ))}
      </List>
    </Container>
  );
};

export default PropositionsList;
