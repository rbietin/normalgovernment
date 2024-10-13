import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
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
    return <div>Loading...</div>;
  }

  return (
    <List>
      {propositions.map((prop) => (
        <ListItem
          button
          component={Link}
          to={`/proposition/${prop.id}`}
          key={prop.id}
        >
          <ListItemText primary={prop.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default PropositionsList;
