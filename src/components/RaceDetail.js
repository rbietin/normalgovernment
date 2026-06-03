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
  Chip,
  Box,
  Button,
  Stack,
} from '@mui/material';
import yaml from 'js-yaml';

const Section = ({ title, children }) => (
  <Box sx={{ mt: 2 }}>
    <Typography variant="subtitle2" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }} color="text.secondary">
      {title}
    </Typography>
    {children}
  </Box>
);

const CandidateCard = ({ c }) => (
  <Card variant="outlined" sx={{ mb: 3 }}>
    <CardContent>
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
        <Typography variant="h6">{c.name}</Typography>
        {c.party && <Chip size="small" label={c.party} />}
      </Stack>
      {c.current_role && (
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {c.current_role}
        </Typography>
      )}
      {c.background && <Typography variant="body1" paragraph>{c.background}</Typography>}

      {c.track_record && c.track_record.length > 0 && (
        <Section title="Track record & outcomes">
          {c.track_record.map((t, i) => (
            <Box key={i} sx={{ mb: 1.5 }}>
              <Typography variant="body1">
                <strong>{t.claim}</strong>
              </Typography>
              {t.detail && <Typography variant="body2">{t.detail}</Typography>}
              {t.outcome && (
                <Typography variant="body2" color="text.secondary">
                  <strong>Outcome:</strong> {t.outcome}
                </Typography>
              )}
            </Box>
          ))}
        </Section>
      )}

      {c.key_positions && c.key_positions.length > 0 && (
        <Section title="Key positions">
          <List dense>
            {c.key_positions.map((p, i) => (
              <ListItem key={i} sx={{ py: 0 }}>
                <ListItemText primary={`• ${p}`} />
              </ListItem>
            ))}
          </List>
        </Section>
      )}

      <Grid container spacing={2} sx={{ mt: 0.5 }}>
        {c.pros && c.pros.length > 0 && (
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" color="primary">Pros</Typography>
            <List dense>
              {c.pros.map((p, i) => (
                <ListItem key={i} sx={{ py: 0 }}>
                  <ListItemText primary={`+ ${p}`} />
                </ListItem>
              ))}
            </List>
          </Grid>
        )}
        {c.cons && c.cons.length > 0 && (
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" color="secondary">Cons</Typography>
            <List dense>
              {c.cons.map((p, i) => (
                <ListItem key={i} sx={{ py: 0 }}>
                  <ListItemText primary={`− ${p}`} />
                </ListItem>
              ))}
            </List>
          </Grid>
        )}
      </Grid>

      {c.what_others_say && c.what_others_say.length > 0 && (
        <Section title="What others say">
          {c.what_others_say.map((w, i) => (
            <Typography variant="body2" key={i} sx={{ mb: 0.5 }}>
              <Chip
                size="small"
                label={w.stance === 'pro' ? 'PRO' : 'CON'}
                color={w.stance === 'pro' ? 'success' : 'error'}
                sx={{ mr: 1 }}
              />
              <strong>{w.who}:</strong> {w.point}
            </Typography>
          ))}
        </Section>
      )}

      {c.endorsements && c.endorsements.length > 0 && (
        <Section title="Endorsements">
          <Typography variant="body2">{c.endorsements.join(' · ')}</Typography>
        </Section>
      )}

      {c.funding && (
        <Section title="Funding">
          <Typography variant="body2">{c.funding}</Typography>
        </Section>
      )}
    </CardContent>
  </Card>
);

const RaceDetail = ({ dataUrl = '/ballot_2026.yaml', listLink = '/' }) => {
  const { id } = useParams();
  const [race, setRace] = useState(null);

  useEffect(() => {
    fetch(dataUrl)
      .then((response) => response.text())
      .then((text) => {
        const data = yaml.load(text);
        const items = Array.isArray(data) ? data : data.items || [];
        setRace(items.find((r) => r.id === id));
      })
      .catch((error) => console.error('Error loading ballot file:', error));
  }, [id, dataUrl]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!race) {
    return (
      <Container>
        <Typography variant="h5">Loading...</Typography>
      </Container>
    );
  }

  const candidates = race.candidates || [];
  const frontrunners = candidates.filter((c) => c.tier === 'frontrunner');
  const others = candidates.filter((c) => c.tier !== 'frontrunner');

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {race.office}
      </Typography>
      {race.election_type && (
        <Typography variant="body2" color="text.secondary" paragraph>
          {race.election_type}
        </Typography>
      )}

      {race.whats_at_stake && (
        <>
          <Typography variant="h6">What's at stake</Typography>
          <Typography paragraph>{race.whats_at_stake}</Typography>
        </>
      )}

      {race.how_to_think && (
        <Typography variant="body2" color="text.secondary" paragraph>
          <strong>How to think about it:</strong> {race.how_to_think}
        </Typography>
      )}

      <Divider sx={{ my: 2 }} />

      {frontrunners.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>Front-runners</Typography>
          {frontrunners.map((c, i) => (
            <CandidateCard c={c} key={i} />
          ))}
        </>
      )}

      {others.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>Other candidates</Typography>
          <List>
            {others.map((c, i) => (
              <ListItem key={i} alignItems="flex-start">
                <ListItemText
                  primary={
                    <span>
                      {c.name}
                      {c.party ? ` (${c.party})` : ''}
                    </span>
                  }
                  secondary={c.note || c.current_role}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}

      {race.sources && race.sources.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" color="text.secondary">Sources</Typography>
          <List dense>
            {race.sources.map((s, i) => (
              <ListItem key={i} sx={{ py: 0 }}>
                <ListItemText
                  primary={
                    <a href={s} target="_blank" rel="noopener noreferrer" style={{ wordBreak: 'break-all' }}>
                      {s}
                    </a>
                  }
                />
              </ListItem>
            ))}
          </List>
        </>
      )}

      <Button variant="contained" component={Link} to={listLink} sx={{ mt: 2 }}>
        ← Back to ballot
      </Button>
      <Box sx={{ height: 50 }} />
    </Container>
  );
};

export default RaceDetail;
