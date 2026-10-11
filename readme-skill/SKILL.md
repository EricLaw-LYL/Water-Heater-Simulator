---
name: water-heater-readme
description: Review the current Water Heater Flow Lab build and refresh its README web page with accurate controls, equations, defaults, numerical methods, and limitations. Use for this simulator's documentation and model explanations, not unrelated README work.
---

# Water Heater README

On every invocation, review the current implementation before updating the README. Do not merely reuse earlier documentation or conversation history.

## Locate the build

The initial project is `/Users/ericlaw/Github/Water Heater Simulator`. Its implementation is `dist/index.html` and its documentation is `dist/readme.html`. Prefer a user-specified replacement checkout when provided; if this path is missing, locate the current project rather than inventing its behavior.

## Review and update

Read the HTML controls, CSS relevant to the diagram, JavaScript state, unit conversions, mixing calculation, timestep and thermal update, thermostat logic, and reset behavior. Follow imports if the app has been split into files. Treat source as authoritative for what the simulator actually does. Distinguish its approximations from real-appliance physics.

Update `dist/readme.html` in place, preserving its responsive styling and navigation from the simulator. Explain all current controls, ranges, defaults, units, visible readings, and meaningful interactions. Document formulas with defined variables and dimensions, initial/boundary conditions, heat distribution, mixing and buoyancy algorithms, numerical update order, time acceleration, and known limitations. Include worked examples recalculated from current constants. Identify code functions alongside equations so a future reviewer can trace them.

Pay particular attention to display-only conversions versus state changes, flow rounding when units switch, tank draw versus total mixed output, unavailable temperature targets, thermostat hysteresis and overshoot, and the finite nature of buoyancy relaxation. Do not claim these details still exist without checking the current build.

Record the review date and SHA-256 of the final `dist/index.html` in the page. Add or retain a README link in the simulator; compute the hash after any navigation edit. Keep formulas readable offline using HTML text, subscripts and superscripts, or native MathML; do not require a remote renderer.

Verify representative numerical examples against the implementation, check local navigation and anchors, and run relevant existing checks if their assumptions remain current. Do not blindly run stale scratch tests. Report any unverified browser layout honestly. Review discrepancies without silently changing simulation behavior: this skill authorizes README and navigation updates, not model redesign or publication.

Deliver the updated page and a concise account of material documentation changes. If the current source cannot be accessed, explain the blocker instead of claiming the README is current.

## README presentation

Preserve the current dark, responsive README layout and its section anchors. Use each contents-link label verbatim as its section’s H2 heading (for example, “Controls”), followed by a descriptive H3 subheading (for example, “Using the page”). Apply this hierarchy to every top-level section. Nest detailed topics below the relevant subheading using H4 where appropriate.

Keep the desktop contents pane fixed on the left, highlight the section currently visible while scrolling, and retain the fixed bottom-left “Back to simulator” link. Preserve the mobile layout, accessible navigation, and active-section behavior.

Render formulas from LaTeX into offline HTML/MathML with the existing bundled KaTeX assets; do not add a remote rendering dependency. Preserve existing rendered equations when their math has not changed.

Review chart documentation against the implementation, including series, hover details, axes, sampling, unit conversion, pause, and reset. The current presentation uses one average/sensor chart and one combined eight-section chart; treat code as authoritative if this changes.
