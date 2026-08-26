# Spacing & Units Approach

## Units

| Use | Unit | Why |
|---|---|---|
| Root font size | **don't set it** | `1rem` must mean the reader's base size. Setting px on `html` discards their preference. |
| Type | **rem** | Only unit that responds when a user changes their default font size. GOV.UK Frontend does this. |
| Vertical spacing | **rem** | If text grows and the space between blocks doesn't, the text tightens and readability drops. |
| Horizontal padding | **px** | A reader with larger text needs *more* line width. Scaling horizontal padding squeezes the column exactly when it needs room. |
| Breakpoints | **px** | `rem`/`em` in media queries resolve against the browser default, not our root — so `40rem` means 640px regardless. px avoids the trap. |
| Borders, hairlines, shadows | **px** | Shouldn't scale with type. |
| One line of space | **lh** | `1lh` = the element's computed line-height. 93.5% support. |
| Full-height sections | **svh** | Plain `vh` equals `lvh`, so content hides behind mobile browser UI. Our header is `98vh`. |

**Never use `%` for vertical margin or padding.** It resolves against the containing block's *width*, and grid/flex behaviour differs between engines.

**Never use `em` on a container with no `font-size`.** It resolves against whatever was inherited. This is why `Related.astro`'s `row-gap: 2em` renders 24px, not the intended 32px.

## Scale

- **Geometric, not linear.** Adjacent steps must be visibly different. Our 5/10/15/30/60 has ratios of 2, 1.5, 2, 2 — half the scale reads as a mistake rather than a decision.
- **Cover the values the page actually uses.** 40px and 80px are hardcoded because the scale has no step there. Adding `--spacing-new-40` treats the symptom.
- **Separate roles.** `stack` (space between things) and `inset` (space inside things), even where the values match today. `--spacing-md` is currently a grid gutter, a component padding and a flex gap at the same time.

## Architecture

- **Components own padding. Never outer margins.** Two components each bringing a margin produce a gap that is neither one's value, and neither can adapt to context.
- **Layout owns the space between components.** A flow/stack utility, or `gap` where the parent is already flex/grid.

```css
.flow > * + * { margin-block-start: var(--flow-space, 1rem); }
```

`* + *` skips the first child, so there's never a leading gap to fight. Children override `--flow-space` locally.

- **Section rhythm is its own layer.** Sections own their vertical padding and sit in a page-level stack with larger steps. Currently sections butt together at 0 and the visible space comes from whichever child's margin escapes.
- **Margins in one direction only**, using logical properties (`margin-block-start`). Adjacent vertical margins collapse to the larger of the two.

## Applies to our code

- `TextBlock`, `Gallery`, `Related`, `Credits` all set their own outer margins. Move to the page stack.
- Footer logo gap was `row-gap: 60px` + `margin-block: 60px` = 120px. Gaps don't collapse with margins.
- Body type is 12px = `0.75rem`. A reader who sets 20px gets 15px — we scale their preference down by a quarter. Design decision, not a bug, but worth knowing.

## Open decisions

- **Fluid vs stepped.** Clearleft interpolates with `clamp()` between two viewport sizes. GOV.UK uses two fixed values at one breakpoint. Both are real published practice at scale. Ours to pick.
- **62.5% root (`1rem` = 10px).** Not in the best-practice literature, but proportional so it preserves reader preference, and makes our 5-based scale clean halves. Team preference, not a correctness question. Only real hazard is third-party CSS assuming `1rem` = 16px — we have none.

## Worth adopting

`text-box-trim` reached Baseline in August 2026 (Chrome/Edge 133, Safari 18.2, Firefox 154):

```css
h1, h2, h3, p { text-box: trim-both cap alphabetic; }
```

Trims the half-leading — the invisible space CSS puts above and below every line — so the space we specify is the space that appears. Without it, a heading at `line-height: 1.1` and body at `1.6` carry different hidden padding, which is why hand-tuned spacing never transfers between contexts. Only affects the first and last line of a block, not the gaps between wrapped lines. Degrades gracefully.

## References

- [GOV.UK Design System — Spacing](https://design-system.service.gov.uk/styles/spacing/) and [Type scale](https://design-system.service.gov.uk/styles/type-scale/)
- [Josh Comeau — The Surprising Truth About Pixels and Accessibility](https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/)
- [Every Layout — The Stack](https://every-layout.dev/layouts/stack/)
- [Nathan Curtis — Space in Design Systems](https://eightshapes.com/articles/space-in-design-systems/)
- [Andy Bell — CUBE CSS](https://piccalil.li/blog/cube-css/)
- [Clearleft — Designing with fluid type scales](https://clearleft.com/thinking/designing-with-fluid-type-scales)
- [Manuel Matuzović — How browsers zoom text](https://www.matuzo.at/blog/2023/how-browsers-zoom-text)
- [Rachel Andrew — Percentage margins and padding on grid and flex items](https://rachelandrew.co.uk/archives/2017/12/20/how-should-we-resolve-percentage-margins-and-padding-on-grid-and-flex-items/)
- [MDN — text-box-trim](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-box-trim)
