// src/About.js

import React from 'react';
import { Container, Typography, Link } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Page Title */}
      <Typography variant="h4" gutterBottom>
        About
      </Typography>

      {/* Introduction */}
      <Typography variant="body1" paragraph>
        Hi, my name is Roman, and I live in San Francisco.
      </Typography>

      {/* Problem Statement */}
      <Typography variant="h6" gutterBottom>
        The Problem I See
      </Typography>
      <Typography variant="body1" paragraph>
        Navigating the voting process can be overwhelming. Voter pamphlets often
        span hundreds of pages filled with complex language, making it difficult
        for many to digest the information necessary to make informed decisions.
      </Typography>

      {/* Potential Solution */}
      <Typography variant="h6" gutterBottom>
        A Potential Solution
      </Typography>
      <Typography variant="body1" paragraph>
        I believe that accessing clear, concise, and unbiased information
        shouldn't be a hurdle for voters. My goal is to simplify the way we
        understand propositions by presenting the essential details in an
        accessible format.
      </Typography>

      {/* About This MVP */}
      <Typography variant="h6" gutterBottom>
        About This MVP
      </Typography>
      <Typography variant="body1" paragraph>
        I built this MVP primarily for myself to
        streamline the process of making informed voting choices without sifting
        through extensive pamphlets. This platform distills key information
        about each proposition, helping you grasp the implications without the
        time-consuming research.
      </Typography>

      {/* Disclaimer */}
      <Typography variant="h6" gutterBottom>
        Disclaimer
      </Typography>
      <Typography variant="body1" paragraph>
        Please note that all information on this site is generated based on AI
        interpretations of voter pamphlets. While I strive for accuracy, there
        may be inaccuracies or omissions. I encourage you to consult official
        resources or additional materials if you need more detailed information.
      </Typography>

      {/* Feedback and Contact */}
      <Typography variant="h6" gutterBottom>
        Feedback and Contact
      </Typography>
      <Typography variant="body1" paragraph>
        I appreciate (and looking forward to!) any feedback you might have to improve this thing. I plan to work on it over the next week:
      </Typography>
      <Typography variant="body1">
        • <strong>Reddit:</strong>{' '}
        <Link
          href="https://www.reddit.com/user/i-do-something/"
          target="_blank"
          rel="noopener"
        >
          i-do-something
        </Link>
        <br />
        • <strong>Email:</strong>{' '}
        <Link href="mailto:r.bietin@gmail.com">
          r.bietin@gmail.com
        </Link>
        <br />
        • <strong>Telegram:</strong>{' '}
          @rbietin
        <br />
        • <strong>Twitter:</strong>{' '}
        <Link
          href="https://twitter.com/RBietin"
          target="_blank"
          rel="noopener"
        >
          @RBietin
        </Link>
      </Typography>
    </Container>
  );
};

export default About;
