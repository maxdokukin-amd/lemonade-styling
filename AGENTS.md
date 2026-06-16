# AGENTS.md — Lemonade Styling Kit

This repository is a **styling reference kit**, not an app. Its single job is to convey
the **AMD Lemonade** look & feel so that any agent can build new UI that is visually
indistinguishable from the official [lemonade-sdk/lemonade](https://github.com/lemonade-sdk/lemonade) desktop app.

If you are an agent building a Lemonade extension or companion UI, **read this file first**,
then apply the rules below. Everything you need is in `portfolio/css/`.

---

## The contract (read this, then obey it)

1. **Never hardcode a color.** Always use a CSS variable from `portfolio/css/tokens.css`.
   `#0a0a0a` is wrong; `var(--bg-primary)` is right. This is what makes light/dark themes work.
2. **Reuse the `.lm-*` components** in `portfolio/css/components.css` before inventing new ones.
   They already match the SDK exactly (class names mirror the real app).
3. **Dark is the default theme.** Set `data-theme="dark"` (or `"light"`) on `<html>`.
   `:root` = dark; `[data-theme="light"]` = the warm cream daylight palette.
4. **The accent is lemon-yellow** (`--lemon-yellow-bright` / `--lemon-amber`). Use it sparingly —
   for focus rings, active states, loading, and one primary call-to-action. It is a seasoning, not a sauce.
5. **Match the motion language:** `0.15s ease` for micro-interactions, `0.2s ease` for most
   transitions, `0.3s ease` for buttons. Hover = subtle lift (`translateY(-2px)`) or alpha overlay.

If a design choice isn't covered here, open `docs/STYLE_GUIDE.md` — it is the source of truth.

---

## How to use the kit

Link the two reusable stylesheets, set a theme, use the classes:

```html
<html data-theme="dark">
<head>
  <link rel="stylesheet" href="portfolio/css/tokens.css" />
  <link rel="stylesheet" href="portfolio/css/components.css" />
</head>
<body>
  <button class="lm-btn lm-btn-accent">Run model</button>
  <span class="lm-status"><span class="lm-dot connected"></span> Connected</span>
</body>
</html>
```

- `tokens.css` — design tokens only (colors, radii, type, motion). The reusable core. **Always include.**
- `components.css` — the `.lm-*` component library. Depends on `tokens.css`.
- `portfolio/` — a live gallery of every component. Open `portfolio/index.html` to see them rendered.

To preview locally: `cd portfolio && python -m http.server 8137` → http://localhost:8137

---

## Quick reference

| Need | Use |
|------|-----|
| Color / spacing / radius | a `var(--token)` from `tokens.css` |
| Button | `.lm-btn` + `.lm-btn-{primary,accent,secondary,danger,ghost}` |
| Icon / send button | `.lm-icon-btn`, `.lm-send-btn` |
| Text input | `.lm-input`, `.lm-input-prefix`, `.lm-select`, `.lm-label` |
| Toggle / slider | `.lm-switch`, `.lm-slider` |
| Badge / pill / tag | `.lm-badge`, `.lm-pill`, `.lm-tag.{capability}` |
| Status dot | `.lm-status` + `.lm-dot.{connected,loading,error,idle}` |
| Card / list row | `.lm-card`, `.lm-row` |
| Menu / dropdown | `.lm-menu` |
| Chat | `.lm-chat`, `.lm-msg.{user,assistant}`, `.lm-composer` |
| Toast | `.lm-toast.{success,info,warning,error}` in `.lm-toast-container` |
| Spinner | `.lm-spinner` |

Full prop-by-prop detail: **`docs/COMPONENTS.md`**.

---

## Do / Don't

| Do | Don't |
|----|-------|
| `color: var(--text-primary)` | `color: #fff` |
| `border-radius: var(--radius-md)` | `border-radius: 6px` |
| Reuse `.lm-btn-accent` for the primary CTA | Paint every button yellow |
| Let `data-theme` drive light/dark | Write `@media (prefers-color-scheme)` overrides that fork the palette |
| Keep hovers subtle (lift / alpha) | Add heavy shadows or bright glows everywhere |
| Add new tokens to `tokens.css` if truly missing | Inline a one-off hex in component code |

---

## Repository map

```
lemonade-styling/
├── AGENTS.md              ← you are here (the styling contract)
├── README.md             ← human-facing overview
├── docs/
│   ├── STYLE_GUIDE.md    ← the design language: philosophy, color, type, motion, recipes
│   └── COMPONENTS.md     ← per-component class & markup reference
└── portfolio/
    ├── index.html        ← live component gallery
    ├── logo.svg          ← the Lemonade logo
    ├── css/
    │   ├── tokens.css    ← design tokens (light + dark) — the reusable core
    │   ├── components.css← .lm-* component library
    │   └── portfolio.css ← styling for the gallery page only (do not reuse)
    └── js/app.js         ← gallery interactions (theme toggle, toasts)
```

> Note: `portfolio/css/portfolio.css` styles the demo page itself — it is **not** part of the
> reusable kit. Only ship `tokens.css` + `components.css` into a real project.
