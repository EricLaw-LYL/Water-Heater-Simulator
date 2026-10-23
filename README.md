# Water Heater Simulator

Explore how a storage water heater supplies mixed hot water, cools during use, and recovers with gas or electric heating. The browser simulation shows a tank cutaway, a lower-tank thermostat sensor, and live temperature charts.

This is an educational numerical model. It is not an appliance-sizing or safety tool.

## Try it locally

Open [dist/index.html](dist/index.html) directly in a browser, or serve the site locally:

```sh
python3 -m http.server 8001 --bind 127.0.0.1 --directory dist
```

Visit **http://127.0.0.1:8001/**. No build step or dependency installation is required. The simulator, charts, and formula documentation work offline.

1. Choose the tank size, heat source, thermostat, and inlet temperature.
2. Set the desired mixed output temperature and total tap flow.
3. Open the hot tap and press **Start**. The simulation begins paused, at 10× speed by default.
4. Close the tap to watch heating restore the tank temperature. **Start over** resets the tank at the selected thermostat setting and pauses it.

## Features

- A full storage tank modeled as 24 equal-volume layers, with eight displayed temperatures from top to bottom.
- Gas or electric heating, a lower-tank sensor, and thermostat hysteresis.
- An ideal tap mixer that blends tank-top water with cold supply water.
- Adjustable tank capacity, flow, temperatures, heating power, and simulation speed.
- Litre/US gallon and Celsius/Fahrenheit displays.
- Three aligned history views: average/sensor temperatures with tank draw rate on a second axis, eight section-temperature lines, and an eight-row temperature matrix.
- MM:SS hover tables, legend hover highlighting, multiple pinned highlights, and **Reset highlights**.

History and settings stay in memory; reloading restores the defaults.

## Model documentation

[How the simulator works](dist/readme.html) covers every control, the equations, numerical update order, assumptions, worked examples, and limitations. Formulas are pre-rendered from LaTeX with bundled KaTeX.

The default model is a 190 L tank at 55°C with a 15°C inlet. At a 40°C output target and 8 L/min total flow, the initial blend is 62.5% tank water: 5 L/min from the tank and 3 L/min from the cold bypass. That fraction changes as the tank cools.

## Development and checks

The current `main` branch uses plain HTML, CSS, JavaScript, SVG for the diagram, and Canvas 2D for all graphs. There is no application framework, server component, or build pipeline.

```text
dist/
  index.html       Simulator, diagram, and chart code
  readme.html      Model reference and equations
  vendor/katex/    Offline formula styling, fonts, and license
tests/             Offline asset, documentation, and interaction checks
readme-skill/      Reusable instructions for refreshing model documentation
.github/workflows/ Validation and manual GitHub Pages deployment
```

Use Node.js 22 or newer to run:

```sh
npm test
```

Checks cover script syntax, local assets and navigation, the documented simulator fingerprint, and legend hover/selection/reset behavior. Tests use a simulated DOM and Canvas; they do not replace a visual browser review.

After changing `dist/index.html`, review `dist/readme.html` and refresh its review date and SHA-256 fingerprint. The `$water-heater-readme` skill describes that review. Do not change only the fingerprint without checking the documentation.

The experimental `migrate-echarts` branch is retained for comparison. GitHub Pages deployment uses `main`, the preferred Canvas version.

## Publish on GitHub Pages

The repository is prepared for Pages but has not been published or connected to a GitHub remote. Deployment is manual; pushing a commit does not publish the site.

When ready to publish:

1. Create an empty GitHub repository and push this local `main` branch to it.
2. In the repository’s **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source.
3. In **Actions**, open **Deploy GitHub Pages**, choose **Run workflow**, and select `main`.
4. The workflow runs `npm test`, uploads only `dist/`, and deploys it to the `github-pages` environment. Its deployment summary provides the published URL.

For subsequent releases, push the desired changes to `main` and run the deployment workflow again. The separate **Checks** workflow validates pushes and pull requests without deploying.

All site links and font paths are relative, so the same files work under a GitHub project URL such as `https://OWNER.github.io/REPOSITORY/`. No custom domain or secret token is required by the workflow.

See [GitHub’s Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) for the hosting setup.

## Third-party software

The main branch bundles **KaTeX 0.16.22** under the MIT license. Its license is included in `dist/vendor/katex/LICENSE`; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). The simulator does not load scripts, fonts, or chart libraries from a CDN.
