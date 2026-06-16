# Lemonade Style Guide

The design language of the AMD Lemonade SDK, distilled for reuse. This is the **source of
truth** for visual decisions. All values here are extracted from the official app
(`src/app/styles/` in lemonade-sdk/lemonade) and codified in `portfolio/css/tokens.css`.

---

## 1. Brand philosophy

Lemonade is **local AI for everyone** — warm, approachable, and quietly powerful. The UI
reflects that:

- **Two faces, one identity.** A bright **cream daylight** theme and a deep **near-black night**
  theme. Both are first-class; the app ships dark by default.
- **Lemon-yellow as a seasoning.** The signature accent appears in small, deliberate doses —
  focus rings, the active-tab marker, loading pulses, one primary action. Never wall-to-wall yellow.
- **Calm surfaces, quiet borders.** Backgrounds are layered in subtle steps; borders are low-contrast.
  Hierarchy comes from spacing and weight, not loud color.
- **Restrained motion.** Short, eased transitions. Hover lifts a couple of pixels or adds a faint
  alpha overlay — nothing bouncy.

When in doubt: **subtle, warm, legible.**

---

## 2. Theming model

Themes are driven by a single attribute on the root element:

```html
<html data-theme="dark">   <!-- default -->
<html data-theme="light">  <!-- warm cream -->
```

- `:root { … }` defines the **dark** palette.
- `[data-theme="light"] { … }` overrides tokens for the **light** palette.

Because every component reads `var(--token)`, flipping the attribute reskins the entire UI with
zero component changes. **This only works if you never hardcode colors.**

---

## 3. Color tokens

### 3.1 Brand accents (theme-independent)

| Token | Hex | Use |
|-------|-----|-----|
| `--lemon-yellow` | `#f0c040` | Primary accent (light-theme buttons) |
| `--lemon-yellow-bright` | `#ffc832` | Marketplace highlights, accent badges |
| `--lemon-amber` | `#facc15` | Focus rings, loading pulses, slider fill, toggle-on |
| `--lemon-green` | `#b3d745` | Logo leaf; sparing positive accent |

### 3.2 Surfaces

| Token | Dark | Light | Use |
|-------|------|-------|-----|
| `--bg-primary` | `#0a0a0a` | `#fdfbf6` | App background, deepest layer |
| `--bg-secondary` | `#1a1a1a` | `#f5f2ec` | Cards, panels, raised surfaces |
| `--bg-tertiary` | `#111111` | `#ffffff` | Inputs, section headers |
| `--bg-quaternary` | `#2a2a2a` | `#fef3c7` | Subtle highlight fills |
| `--header-bg-color` | `#000000` | `#fdfbf6` | Title/header bars |
| `--bg-hover` | `#f0f0f0` | `rgba(240,192,64,.4)` | Primary-button hover |

### 3.3 Text

| Token | Dark | Light | Use |
|-------|------|-------|-----|
| `--text-primary` | `#ffffff` | `#000000` | Headings, key labels |
| `--text-secondary` | `#888888` | `#0a0a0a` | Muted/meta text |
| `--text-tertiary` | `#cccccc` | `#0a0a0a` | Body copy |
| `--text-quaternary` | `#666666` | `#91897d` | Placeholders, disabled |
| `--text-aaa` | `#aaaaaa` | `#0a0a0a` | Card body |
| `--text-link` / `--text-link-hover` | `#75abd7` / `#96c5e9` | `#1976d2` / `#176abd` | Links |

### 3.4 Borders

| Token | Dark | Light |
|-------|------|-------|
| `--border-primary` | `#333333` | `#e2ddd1` |
| `--border-secondary` | `#2a2a2a` | `#e2ddd1` |
| `--border-tertiary` | `#1a1a1a` | `#e2ddd1` |
| `--border-4/5/6/8` | `#444 / #555 / #666 / #888` | same |

Plus white-alpha overlay borders `--border-alpha-{05…2}` for layering on dark surfaces.

### 3.5 Semantic / status

| Token | Value | Meaning |
|-------|-------|---------|
| `--success-color` | `#4CAF50` | Loaded / connected / OK |
| `--warning-color` | `#ffb74d` | Update available / caution |
| `--info-color` | `#2196F3` | Informational |
| `--action-color` | `#FF9800` | Reversible action (unload) |
| `--error-color` | `#f44336` | Failure / destructive |

Status surfaces (`--status-connected`, `--status-error`, …) pair a translucent fill with an
`--on-status-*` foreground for connection chips.

### 3.6 Capability label colors (model tags)

`--label-reasoning #6495ED` · `--label-coding #48BB78` · `--label-vision #9F7AEA` ·
`--label-hot #F56565` · `--label-embeddings #ED8936` · `--label-reranking #D69E2E` ·
`--label-tool-calling #38B2AC` · `--label-custom #FAD02C`

### 3.7 Alpha overlays

`--bg-alpha-{01…5}` and `--border-alpha-{05…2}` provide neutral hover/press/layer washes that
adapt per theme (white-on-dark, black-on-light). Prefer these over opaque greys for hover states.

---

## 4. Typography

- **Font stack:** `--font-sans` =
  `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`
  (native system UI font — fast, familiar, no web-font load).
- **Mono:** `--font-mono` = `'Courier New', ui-monospace, SFMono-Regular, Menlo, monospace` (code, logs).
- **Scale (observed):** body `0.9rem`, controls `0.8–0.85rem`, meta/labels `0.6–0.7rem`,
  section titles `0.78rem` uppercase, card titles `1.1rem`, hero `2rem+`.
- **Labels are uppercase + tracked:** `text-transform: uppercase; letter-spacing: 0.3–0.6px;
  font-weight: 500–600;` for form labels, section headers, and badges.
- **Line-height:** `1.4–1.5` for body and chat.

---

## 5. Spacing, radii & elevation

- **Radii:** `--radius-sm 4px` (inputs, small controls), `--radius-md 6px` (buttons),
  `--radius-lg 8px` (cards-in-panels, toasts), `--radius-xl 12px` (cards, chat bubbles),
  `--radius-pill 999px` (pills, switches, slider tracks).
- **Spacing rhythm:** controls pad `6–8px` vertical / `8–20px` horizontal; sections pad `12–22px`;
  gaps `4–16px`. Keep to multiples of ~2–4px.
- **Elevation (shadows):**
  - Cards: `0 10px 30px rgba(0,0,0,0.5)`
  - Menus/dropdowns: `0 4px 12px rgba(0,0,0,0.5)`
  - Toasts: `0 8px 24px rgba(0,0,0,0.6)`
  - Hover lift on tiles: `0 8px 24px rgba(0,0,0,0.4)`
  Shadows are soft and dark; do not tint them with color.

---

## 6. Motion

| Speed | Token-equivalent | Where |
|-------|------------------|-------|
| `0.15s ease` | micro | hover/focus on rows, menu items, icon buttons |
| `0.2s ease` | standard | inputs, toggles, most state changes |
| `0.3s ease` | deliberate | buttons, layout transitions |

- **Easing:** `--ease` = `cubic-bezier(0.4, 0, 0.2, 1)` for entrances/popovers.
- **Signature animations:** pulsing status dot (`lm-pulse`), spinner (`lm-spin`),
  toast slide-in from the right, dropdown `slideDown`. Keep durations short (≤0.3s) and loops calm.
- **Hover convention:** either a `translateY(-2px)` lift **or** a faint alpha overlay — not both,
  and never a scale jump except the send button (`scale(1.05)`).

---

## 7. Component recipes (canonical patterns)

These are the patterns the SDK uses; the `.lm-*` classes implement them.

- **Button** — `padding: 8px 20px; radius: 6px; uppercase; letter-spacing: 0.5px; font-weight: 600;
  transition: all 0.3s ease;` Primary lifts + soft glow on hover. Accent = lemon-yellow fill.
- **Input** — `padding: 8px 12px; bg: var(--bg-primary); 1px var(--border-primary); radius: 6px;`
  Border brightens to `--border-5` on focus; no default outline.
- **Card** — `bg: var(--bg-secondary); 1px var(--border-primary); radius: 12px; shadow lg;`
  Hover lifts 2px and brightens border to `--border-4`.
- **Status dot** — 8px circle; `connected` = green w/ glow, `loading` = amber pulsing,
  `error` = red, `idle` = grey. Always pair with a short label.
- **Badge/pill** — pill radius, `0.6rem` uppercase, low-contrast border + secondary surface.
  Accent badge uses the yellow gradient + animated glow for "new/featured" only.
- **Toast** — bottom-right stack, slide-in, `radius: 8px`, colored left-state border + tinted
  gradient surface per type, auto-dismiss ~4s.
- **Chat** — user bubble: outlined, right-aligned, `radius: 12px`. Assistant: borderless,
  left-aligned, tertiary text. Composer: rounded container that brightens border on focus.

See `docs/COMPONENTS.md` for exact markup of each.

---

## 8. Accessibility & correctness checklist

- [ ] All colors come from tokens (verify light **and** dark both read well).
- [ ] Interactive elements have a visible focus state (amber ring is the house style).
- [ ] Status/feedback never relies on color alone — pair dots/toasts with text + an icon.
- [ ] Text meets contrast against its surface in both themes.
- [ ] Motion is short and non-essential; nothing important depends on animation completing.
- [ ] Reused a `.lm-*` class instead of re-implementing a primitive.
