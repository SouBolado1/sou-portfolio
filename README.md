# Sou — Marketing Campaign Portfolio

A static site. No build step, no dependencies, no database. Plain HTML, one stylesheet,
one small script. Edit a file, push, and Vercel redeploys.

## Pages

| URL | File |
|---|---|
| `/` | `index.html` |
| `/work/stock-cart` | `work/stock-cart/index.html` |
| `/work/world-cup` | `work/world-cup/index.html` |
| `/work/better-life` | `work/better-life/index.html` |
| `/work/mantle-s2` | `work/mantle-s2/index.html` |
| `/work/mantle-s1` | `work/mantle-s1/index.html` |

Each case study is a real page at a real URL, so links are shareable and
search engines can index them.

## Files

```
index.html              homepage
work/<campaign>/        one folder per case study
assets/styles.css       all styling, design tokens at the top
assets/site.js          scroll reveal + number count-up
assets/img/             116 images (only what the site actually uses)
vercel.json             clean URLs + cache headers
```

## Preview locally

Either double-click `index.html`, or run a local server for an exact match of
production (Python ships with Windows 11):

```bash
py -m http.server 8787
```

Then open http://127.0.0.1:8787.

## Editing

**Text** — open the page's `index.html` and edit it. The copy is plain HTML;
there are no templates or variables to trace.

**Colours, type, spacing** — every value lives in the `:root` block at the top of
`assets/styles.css`. Change it there and it updates everywhere.

**Animated numbers** — a figure that counts up looks like this:

```html
<span data-count data-to="2680749">2.680.749</span>
```

`data-to` is the number it counts to. The text inside is what shows if
JavaScript is off, so keep the two in sync. Thousands are separated with dots
(`2.680.749`), which is deliberate — it matches the campaign decks.

**Adding a sixth case study** — copy an existing folder under `work/`, rename it,
edit the copy, then add a card to the work grid in `index.html`.

## Notes on the assets

The design handoff shipped 254 images; 116 are actually used and only those were
copied here. Anything over 100 KB was resized to 1600px wide and re-encoded as
JPEG, which took the image payload from 21 MB to 3.6 MB. The originals are in the
handoff zip if you ever need them back.

## Deploying

Vercel is connected to the GitHub repo. Every push to `main` deploys
automatically; pull requests get their own preview URL.
