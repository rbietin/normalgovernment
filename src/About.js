// src/About.js

import React from 'react';
import { Container, Typography, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Page Title */}
      <Typography variant="h4" gutterBottom>
        About
      </Typography>

      {/* Introduction */}
      <Typography variant="body1" paragraph>
        Hi, my name is Roman, and I live in San Francisco. I built Normal
        Government to make it faster to walk into an election actually
        understanding what's on my ballot.
      </Typography>

      {/* Problem Statement */}
      <Typography variant="h6" gutterBottom>
        The Problem I See
      </Typography>
      <Typography variant="body1" paragraph>
        Navigating the voting process can be overwhelming. Voter pamphlets often
        span hundreds of pages filled with complex language, and candidate races
        are even harder — it's tough to tell what someone actually delivered
        versus what they promise. Making an informed choice can take hours of
        research most people don't have.
      </Typography>

      {/* Potential Solution */}
      <Typography variant="h6" gutterBottom>
        What This Site Does
      </Typography>
      <Typography variant="body1" paragraph>
        Normal Government distills each ballot question into a short,
        plain-language brief. For ballot measures, that means a summary, the
        fiscal impact, who supports and opposes it, the strongest arguments on
        each side (with counterarguments), who wins and loses, and what the
        real-world evidence shows. For candidate races, it means each
        front-runner's background, track record with concrete outcomes, key
        positions, endorsements, funding, honest pros and cons, and what
        supporters and critics actually say. The site lays out the facts and the
        arguments on every side and stops there — it deliberately does not tell
        you how to vote or lean for or against any option.
      </Typography>

      {/* Current coverage */}
      <Typography variant="h6" gutterBottom>
        What's Covered Right Now
      </Typography>
      <Typography variant="body1" paragraph>
        The current guide covers the{' '}
        <strong>
          San Francisco Consolidated Statewide Direct Primary on June 2, 2026
        </strong>{' '}
        — all four local ballot measures (A–D) plus the candidate races on the
        ballot, from Governor down to the local Board of Education seat and the
        contested Superior Court judgeship. The original{' '}
        <MuiLink component={RouterLink} to="/2024">
          November 2024 guide
        </MuiLink>{' '}
        is still here as an archive.
      </Typography>

      {/* How it's researched */}
      <Typography variant="h6" gutterBottom>
        How It's Researched
      </Typography>
      <Typography variant="body1" paragraph>
        Each contest is researched starting from the official sources and then
        cross-checked against reporting and endorsements from across the
        political spectrum. You can read the full method on the{' '}
        <MuiLink component={RouterLink} to="/methodology">
          How this was researched
        </MuiLink>{' '}
        page.
      </Typography>

      {/* Disclaimer */}
      <Typography variant="h6" gutterBottom>
        Disclaimer
      </Typography>
      <Typography variant="body1" paragraph>
        Please note that the briefs on this site are generated with the help of
        AI, working from official voter pamphlets and publicly available
        reporting. While I strive for accuracy, there may be inaccuracies,
        omissions, or details that have changed since the research was done. The
        site presents facts and arguments only — it takes no position and makes
        no recommendation; the decision is entirely yours. Please consult
        official resources (sfelections.org, voterguide.sos.ca.gov) and the
        source links on each page before you vote.
      </Typography>

      {/* Feedback and Contact */}
      <Typography variant="h6" gutterBottom>
        Feedback and Contact
      </Typography>
      <Typography variant="body1" paragraph>
        I'd genuinely love any feedback that makes this more useful or more
        accurate:
      </Typography>
      <Typography variant="body1">
        • <strong>Reddit:</strong>{' '}
        <MuiLink
          href="https://www.reddit.com/user/i-do-something/"
          target="_blank"
          rel="noopener"
        >
          i-do-something
        </MuiLink>
        <br />
        • <strong>Email:</strong>{' '}
        <MuiLink href="mailto:r.bietin@gmail.com">r.bietin@gmail.com</MuiLink>
        <br />
        • <strong>Telegram:</strong> @rbietin
        <br />
      </Typography>
    </Container>
  );
};

export default About;
