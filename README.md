# Normal Government

A plain-language voter guide that distills what's actually on your ballot — the
facts and the strongest arguments on every side, with no recommendation and no
lean. Live at [normalgovernment.com](https://www.normalgovernment.com).

## What it covers

- **June 2, 2026** — San Francisco Consolidated Statewide Direct Primary: all
  four local ballot measures (A–D) plus the candidate races on the ballot, from
  Governor down to the local Board of Education seat and the contested Superior
  Court judgeship. This is the home page (`/`).
- **November 2024** — the original San Francisco / California general-election
  guide, kept as an archive at `/2024`.

## How a brief is structured

**Ballot measures** — summary, what a Yes/No vote means, fiscal impact,
supporters and opponents, the strongest consequences of each vote (each paired
with a counterargument), who wins and loses, and what the real-world evidence
shows.

**Candidate races** — what's at stake, then for each front-runner: background,
track record with concrete outcomes, key positions, endorsements, funding, honest
pros and cons, and what supporters and critics actually say. Minor candidates get
a one-line note.

The site presents facts and arguments only — it takes no position, makes no
recommendation, and does not lean for or against any measure or candidate.

How the research is conducted is documented in-app on the
[`/methodology`](https://www.normalgovernment.com/methodology) page (source:
`src/Methodology.js`).

## Project layout

| Path | What it is |
| --- | --- |
| `public/ballot_2026.yaml` | The June 2026 data (measures + candidate races). |
| `public/propositions.yaml` | The November 2024 archive data. |
| `src/components/BallotList.js` | The 2026 home page (grouped measures + races). |
| `src/components/RaceDetail.js` | Candidate-race detail view. |
| `src/components/PropositionDetail.js` | Ballot-measure detail view (both years). |
| `src/components/PropositionsList.js` | The 2024 archive list. |
| `src/About.js`, `src/Methodology.js` | About and research-method pages. |
| `src/services/analytics.js` | Google Analytics wiring. |

Data is plain YAML loaded at runtime with `js-yaml`; each item carries a `type`
of `proposition` or `race`. The 2026 file is written as JSON (which is valid
YAML) for reliability.

## Running locally

```bash
npm install
npm start      # http://localhost:3000
```

## Build & deploy

```bash
npm run build  # production build into ./build
npm run deploy # publishes ./build to GitHub Pages (gh-pages)
```

The custom domain is set in `public/CNAME`.

## A note on accuracy

The briefs are generated with AI assistance, working from official voter
pamphlets and public reporting across the political spectrum. They can contain
errors, omissions, or details that changed after the research date. The site
takes no position and makes no recommendation — the decision is yours. Every
page lists its sources; check the official guides at
[sfelections.org](https://sfelections.org) and
[voterguide.sos.ca.gov](https://voterguide.sos.ca.gov) before voting.

---

Bootstrapped with [Create React App](https://github.com/facebook/create-react-app);
UI built with [MUI](https://mui.com/).
