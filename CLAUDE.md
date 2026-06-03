# CLAUDE.md

Guidance for working in this repo.

## What this is

**Normal Government** ([normalgovernment.com](https://www.normalgovernment.com))
is a plain-language voter guide. It distills each item on a ballot into a short,
factual brief. It is a Create React App + Material UI (MUI v6) single-page app,
data-driven from YAML files, deployed to GitHub Pages.

## Core principle: NON-OPINIONATED

The site presents **facts and the arguments on every side, and nothing more**. It
must **not** recommend a vote, lean for/against any measure or candidate, or
predict winners. When adding or editing content:

- Do **not** reintroduce a "bottom line," "lean," recommendation, or "likely to
  win / advance" field or UI. (These existed earlier and were deliberately
  removed.)
- For measures, every pro is paired with a counterargument and every con with
  one — keep both sides balanced.
- For candidates, report track record (with concrete outcomes), positions,
  endorsements, funding, pros/cons, and what supporters vs. critics say — without
  editorializing.

## Privacy

This is the maintainer's personal project and the data was researched for the
maintainer's own ballot. **Do not commit the maintainer's home address, ZIP,
neighborhood, or any sub-district location hint.** Ballot data may name official
districts (e.g. "Assembly District 19") because those are the official contest
names, but do not add finer-grained location detail. The contact info in
`src/About.js` (email/Reddit/Telegram) is intentionally public.

## Commands

```bash
npm install        # install deps (node_modules is not checked in)
npm start          # dev server at http://localhost:3000 (hot reload)
npm run build      # production build into ./build  (use CI=true to fail on warnings)
npm run deploy     # predeploy runs build, then gh-pages publishes ./build
npm test           # CRA/Jest test runner
```

Deploy target: GitHub Pages via the `gh-pages` branch. Custom domain is set in
`public/CNAME`.

## Architecture

Routing lives in `src/App.js` (react-router v6). The data lives in `public/` as
YAML loaded at runtime with `js-yaml`. Each data item carries a `type` of
`proposition` or `race`.

| Route | Component | Data |
| --- | --- | --- |
| `/` | `components/BallotList.js` | `public/ballot_2026.yaml` (current election home; groups races + measures) |
| `/2026/race/:id` | `components/RaceDetail.js` | `public/ballot_2026.yaml` |
| `/2026/proposition/:id` | `components/PropositionDetail.js` | `public/ballot_2026.yaml` |
| `/2024` | `components/PropositionsList.js` | `public/propositions.yaml` (archive) |
| `/proposition/:id` | `components/PropositionDetail.js` | `public/propositions.yaml` (archive) |
| `/methodology` | `Methodology.js` | — |
| `/about` | `About.js` | — |

`PropositionDetail` is shared across both years via `dataUrl` / `basePath` props
and only cycles items of `type: proposition`. Analytics (Google Analytics) is
wired in `src/services/analytics.js` and initialized in `App.js`.

## Data model

`public/ballot_2026.yaml` is a JSON array (JSON is valid YAML; written as JSON
for reliability). Two shapes:

- **proposition**: `id, type, name, summary, what_yes_means, what_no_means,
  fiscal_impact{short_term,long_term}, supporters[], opponents[],
  potential_consequences_yes[{description,counterargument}],
  potential_consequences_no[...], winners_losers[{group,impact_yes,impact_no}],
  real_world_evidence, sources[]`
- **race**: `id, type, office, election_type, whats_at_stake, how_to_think,
  candidates[{name, party, current_role, tier(frontrunner|other), background,
  track_record[{claim,detail,outcome}], key_positions[], endorsements[], funding,
  pros[], cons[], what_others_say[{who,stance,point}], note}], sources[]`

`tier` controls coverage depth only (front-runners get full cards; `other` gets a
one-line `note`) — it is not a ranking or endorsement.

## Adding a new election

Add a `public/ballot_<year>.yaml`, point a new `BallotList`/detail route set at
it in `App.js`, and keep the prior year reachable as an archive. Reuse the
existing components via their `dataUrl`/`basePath` props.
