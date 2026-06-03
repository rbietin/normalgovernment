// src/Methodology.js

import React from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from '@mui/material';

const Methodology = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        How this was researched
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        This page describes how the June 2, 2026 San Francisco primary guide was
        put together, so you can judge how much to trust it.
      </Typography>

      <Typography variant="h6" gutterBottom>
        The goal
      </Typography>
      <Typography variant="body1" paragraph>
        For every contest on the ballot, distill the <em>actual</em> impact of
        each choice into something you can read in a minute — just the facts and
        the strongest arguments on every side. The site deliberately takes{' '}
        <strong>no position</strong>: no recommendation, no lean for or against
        any measure or candidate, and no prediction of who will win. Not spin,
        not a slate card.
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Sources
      </Typography>
      <List dense>
        <ListItem>
          <ListItemText
            primary="Official, first"
            secondary="Each brief starts from the official text: the San Francisco Department of Elections Voter Information Pamphlet for June 2, 2026 (digests, proponent/opponent and rebuttal arguments, paid arguments, and candidate statements), plus the California Secretary of State's voter guide for statewide offices."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Then, across the spectrum"
            secondary="Official text is cross-checked against independent reporting and endorsements from sources that don't agree with each other — e.g. the SF Chronicle, SF Standard, Mission Local, CalMatters, Ballotpedia, SPUR, the League of Women Voters, GrowSF, the local Democratic and Republican parties, labor councils, and progressive clubs. The aim is to capture how the same question looks from the left, center, and right."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Records and money"
            secondary="For candidates, claims are checked against documented track records (what was actually done and what resulted), campaign-finance reporting (who's funding them), and the official Bar Association ratings for judicial races."
          />
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        The process
      </Typography>
      <List dense>
        <ListItem>
          <ListItemText
            primary="One researcher per contest, in parallel"
            secondary="Each race and measure is researched independently by its own AI research agent, so no contest gets short-changed. Findings are returned in a fixed, structured format so every brief covers the same ground."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Outcomes over slogans"
            secondary="For candidates, every track-record item has to include a concrete outcome — a number, a result, a documented effect — not just a promise or a talking point. Failures and controversies are included alongside accomplishments."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Front-runners deep, long-shots noted"
            secondary="In crowded races (a top-two primary can have dozens of candidates), the leading contenders get a full work-up; minor candidates get a one-line note. Where a race had to be narrowed, that's stated."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Counterarguments built in"
            secondary="For ballot measures, every argument for a Yes is paired with a counterargument, and every argument for a No is paired with one too — so you see the strongest version of both sides."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="No position taken"
            secondary="The briefs stop at the facts and the arguments. The site does not recommend a vote, does not lean for or against any measure or candidate, and does not predict winners — that judgment is left entirely to you."
          />
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        What this guide is not
      </Typography>
      <Typography variant="body1" paragraph>
        These briefs are generated with AI assistance. That makes them fast and
        broad, but it also means they can contain errors, omissions, or details
        that changed after the research date. They are a starting point, not the
        final word. Every page lists its sources — follow them, and check the
        official guides at{' '}
        <a href="https://sfelections.org" target="_blank" rel="noopener noreferrer">
          sfelections.org
        </a>{' '}
        and{' '}
        <a
          href="https://voterguide.sos.ca.gov"
          target="_blank"
          rel="noopener noreferrer"
        >
          voterguide.sos.ca.gov
        </a>{' '}
        before you vote.
      </Typography>

      <Box sx={{ height: 40 }} />
    </Container>
  );
};

export default Methodology;
