# Water Heater Simulator

An interactive, offline-capable model of a storage water heater with gas or electric heating, an ideal tap mixer, and live temperature history.

## Run locally

Open [`dist/index.html`](dist/index.html) in a browser. No build or package installation is required.

To serve it over HTTP, run:

```sh
python3 -m http.server 8000 --directory dist
```

Then visit http://localhost:8000. The simulation starts paused; adjust the controls and press **Start**.

## Model documentation

[`dist/readme.html`](dist/readme.html) explains the controls, equations, numerical method, approximations, and worked examples. It includes offline LaTeX rendering with bundled KaTeX.

## Development

The simulation and diagram live in `dist/index.html`. All files needed at runtime are under `dist/`. Use Node.js 22 or newer to run the checks:

```sh
npm test
```

Local scratch files and hosting settings are ignored. This repository has no configured remote or automatic deployment.

## Branches

- `main`: the original Canvas charts and repository setup.
- `migrate-echarts`: the migration to locally bundled Apache ECharts, preserving all three graph views, aligned time axes, and detailed hover information.

## Third-party software

Bundled dependencies retain their licenses. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
