import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Grid,
  Divider,
  Button,
  Box,
} from '@mui/material';
import yaml from 'js-yaml';

const PropositionDetail = () => {
  const { id } = useParams();
  const [prop, setProp] = useState(null);
  const [propositions, setPropositions] = useState([]);

  useEffect(() => {
    fetch('/propositions.yaml')
      .then((response) => response.text())
      .then((text) => {
        const data = yaml.load(text);
        const propositionsData = data.propositions || data;
        setPropositions(propositionsData);
        const proposition = propositionsData.find((p) => p.id === id);
        setProp(proposition);
      })
      .catch((error) => {
        console.error('Error loading YAML file:', error);
      });
  }, [id]);

  // Scroll to top when id changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!prop) {
    return (
      <Container>
        <Typography variant="h5">Loading...</Typography>
      </Container>
    );
  }

  // Find the index of the current proposition
  const currentIndex = propositions.findIndex((p) => p.id === id);

  // Determine previous and next propositions
  const prevProp = currentIndex > 0 ? propositions[currentIndex - 1] : null;
  const nextProp = currentIndex < propositions.length - 1 ? propositions[currentIndex + 1] : null;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Proposition Name */}
      <Typography variant="h4" gutterBottom>
        {prop.name}
      </Typography>

      {/* Summary */}
      {prop.summary && (
        <>
          <Typography variant="h6">Summary</Typography>
          <Typography paragraph>{prop.summary}</Typography>
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {/* Fiscal Impact */}
      {prop.fiscal_impact && (
        <>
          <Typography variant="h6">Fiscal Impact</Typography>
          <Typography paragraph>
            {prop.fiscal_impact.short_term && (
              <>
                <strong>Short Term:</strong> {prop.fiscal_impact.short_term}
              </>
            )}
            {prop.fiscal_impact.long_term && (
              <>
                {prop.fiscal_impact.short_term && <br />}
                <strong>Long Term:</strong> {prop.fiscal_impact.long_term}
              </>
            )}
          </Typography>
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {/* Supporters and Opponents */}
      {(prop.supporters || prop.opponents) && (
        <>
          <Grid container spacing={4}>
            {prop.supporters && (
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Supporters</Typography>
                <List dense>
                  {prop.supporters.map((supporter, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={supporter} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            )}
            {prop.opponents && (
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Opponents</Typography>
                <List dense>
                  {prop.opponents.map((opponent, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={opponent} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            )}
          </Grid>
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {/* Potential Consequences Side by Side */}
      {(prop.potential_consequences_yes || prop.potential_consequences_no) && (
        <>
          <Typography variant="h6" gutterBottom>
            Potential Consequences
          </Typography>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              alignItems: 'start', // Ensures content starts at the top
            }}
          >
            {/** Determine the maximum length of the two arrays */}
            {Array.from({
              length: Math.max(
                prop.potential_consequences_yes.length,
                prop.potential_consequences_no.length
              ),
            }).map((_, index) => (
              <React.Fragment key={index}>
                {/* If Voted Yes Consequence */}
                <div style={{ gridColumn: '1 / 2' }}>
                  {prop.potential_consequences_yes[index] && (
                    <Card
                      variant="outlined"
                      sx={{
                        mb: 2,
                      }}
                    >
                      <CardContent>
                        <Typography variant="subtitle1" color="primary" gutterBottom>
                          If Voted Yes
                        </Typography>
                        <Typography variant="body1">
                          {prop.potential_consequences_yes[index].description}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ mt: 1 }} // Adds space before counterargument
                        >
                          <strong>Counterargument:</strong>{' '}
                          {prop.potential_consequences_yes[index].counterargument}
                        </Typography>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* If Voted No Consequence */}
                <div style={{ gridColumn: '2 / 3' }}>
                  {prop.potential_consequences_no[index] && (
                    <Card
                      variant="outlined"
                      sx={{
                        mb: 2,
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="subtitle1"
                          color="secondary"
                          gutterBottom
                        >
                          If Voted No
                        </Typography>
                        <Typography variant="body1">
                          {prop.potential_consequences_no[index].description}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ mt: 1 }} // Adds space before counterargument
                        >
                          <strong>Counterargument:</strong>{' '}
                          {prop.potential_consequences_no[index].counterargument}
                        </Typography>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {/* Winners and Losers */}
      {prop.winners_losers && (
        <>
          <Typography variant="h6">Impact on Different Groups</Typography>
          {prop.winners_losers.map((group, index) => (
            <Card variant="outlined" sx={{ mb: 2 }} key={index}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  {group.group}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1" color="primary">
                      If Voted Yes
                    </Typography>
                    <Typography variant="body2">{group.impact_yes}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1" color="secondary">
                      If Voted No
                    </Typography>
                    <Typography variant="body2">{group.impact_no}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </>
      )}

      {/* Navigation Buttons */}
      <Divider sx={{ my: 4 }} />
      <Grid container spacing={2} sx={{ mt: 2 }} alignItems="stretch">
        {prevProp ? (
          <Grid item xs={4} style={{ display: 'flex' }}>
            <Button
              variant="contained"
              component={Link}
              to={`/proposition/${prevProp.id}`}
              color="primary"
              fullWidth
              sx={{ flexGrow: 1 }}
            >
              ← {prevProp.name}
            </Button>
          </Grid>
        ) : (
          <Grid item xs={4} />
        )}
        {/* Empty middle grid item to take up 1/3 of the space */}
        <Grid item xs={4} />
        {nextProp ? (
          <Grid item xs={4} style={{ display: 'flex' }}>
            <Button
              variant="contained"
              component={Link}
              to={`/proposition/${nextProp.id}`}
              color="primary"
              fullWidth
              sx={{ flexGrow: 1 }}
            >
              {nextProp.name} →
            </Button>
          </Grid>
        ) : (
          <Grid item xs={4} />
        )}
      </Grid>

      {/* Add Blank Space at the End */}
      <Box sx={{ height: 50 }} />




    </Container>
  );
};



export default PropositionDetail;
