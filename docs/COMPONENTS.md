# Component Reference

Every reusable primitive in `portfolio/css/components.css`, with copy-paste markup. All classes
are prefixed `lm-` and depend on `tokens.css`. Set `data-theme` on `<html>`; nothing else is required.

See them rendered live in `portfolio/index.html`.

---

## Buttons

```html
<button class="lm-btn lm-btn-primary">Primary</button>
<button class="lm-btn lm-btn-accent">Accent</button>      <!-- the lemon-yellow CTA -->
<button class="lm-btn lm-btn-secondary">Secondary</button>
<button class="lm-btn lm-btn-danger">Danger</button>
<button class="lm-btn lm-btn-ghost">Ghost</button>
<button class="lm-btn lm-btn-primary" disabled>Disabled</button>

<button class="lm-icon-btn">★</button>   <!-- 28px square, outlined -->
<button class="lm-send-btn">➤</button>   <!-- filled; scales on hover -->
```

| Variant | When to use |
|---------|-------------|
| `lm-btn-primary` | Neutral primary action (white/ink fill) |
| `lm-btn-accent` | The single most important CTA on a view (yellow) |
| `lm-btn-secondary` | Secondary action; outlined |
| `lm-btn-danger` | Destructive (delete, eject) |
| `lm-btn-ghost` | Low-emphasis, inline (`+ Add model`) |

> Base `.lm-btn` is always required alongside a variant. Buttons are uppercase + tracked by design.

---

## Inputs & forms

```html
<label class="lm-label">Model</label>
<input class="lm-input" placeholder="Search models…" />

<div class="lm-input-prefix">
  <span class="prefix">hf.co/</span>
  <input placeholder="org/model" />
</div>

<select class="lm-select">
  <option>Vulkan</option><option>ROCm</option>
</select>

<input type="range" class="lm-slider" min="0" max="100" value="64"
       oninput="this.style.setProperty('--progress', this.value + '%')"
       style="--progress:64%" />
```

- `.lm-input` — full-width text field; border brightens on focus.
- `.lm-input-prefix` — input with a static prefix (URLs, units).
- `.lm-select` — styled dropdown (chevron baked in as an SVG background).
- `.lm-label` — uppercase tracked field label.
- `.lm-slider` — set `--progress` (a %) on input to fill the track in amber.

---

## Toggle switch

```html
<label class="lm-switch">
  <input type="checkbox" checked />
  <span class="slider"></span>
</label>
```

36×18px pill; turns **amber** when checked. The theme switcher in the gallery uses this.

---

## Badges, pills & capability tags

```html
<span class="lm-badge">Default</span>
<span class="lm-badge lm-badge-accent">✦ New</span>   <!-- featured/new only -->
<span class="lm-pill">NPU</span>

<span class="lm-tag reasoning">Reasoning</span>
<span class="lm-tag coding">Coding</span>
<span class="lm-tag vision">Vision</span>
<span class="lm-tag hot">Hot</span>
<span class="lm-tag embeddings">Embeddings</span>
<span class="lm-tag reranking">Reranking</span>
<span class="lm-tag tool-calling">Tools</span>
```

- `.lm-badge` — generic pill label. `.lm-badge-accent` adds the yellow gradient + glow.
- `.lm-pill` — square-ish tag for device/backend (`NPU`, `GPU`).
- `.lm-tag.{capability}` — color-coded model-capability chip (colors from `--label-*`).

---

## Status indicators

```html
<span class="lm-status"><span class="lm-dot connected"></span> Connected</span>
<span class="lm-status"><span class="lm-dot loading"></span> Loading</span>
<span class="lm-status"><span class="lm-dot error"></span> Error</span>
<span class="lm-status"><span class="lm-dot idle"></span> Idle</span>
```

`.lm-dot` states: `connected` (green + glow), `loading` (amber, pulsing), `error` (red), `idle` (grey).
Always pair the dot with a text label — never rely on color alone.

---

## Cards

```html
<div class="lm-card">
  <h3>Llama 3.1 8B</h3>
  <p>Hybrid NPU inference, tuned for Ryzen AI.</p>
  <span class="lm-tag coding">Coding</span>
</div>
```

Raised surface, 12px radius, soft shadow; lifts 2px on hover.

---

## List rows

```html
<div class="lm-row">
  <span class="name">Qwen2.5-7B <span class="meta">· 4.7 GB</span></span>
  <span class="lm-dot connected"></span>
</div>
```

The model-manager row pattern: left-border accent + alpha wash on hover.

---

## Menu / dropdown

```html
<div class="lm-menu">
  <div class="item">Load model <span class="shortcut">⌘L</span></div>
  <div class="item">Pull from HF <span class="shortcut">⌘P</span></div>
  <div class="sep"></div>
  <div class="item">Delete <span class="shortcut">⌫</span></div>
</div>
```

`.item` rows highlight on hover; `.shortcut` renders the right-aligned key hint; `.sep` is a divider.

---

## Chat

```html
<div class="lm-chat">
  <div class="lm-msg user">How do I run a model on the NPU?</div>
  <div class="lm-msg assistant">Pull a hybrid recipe, then <code>lemonade run</code>.</div>
</div>

<div class="lm-composer">
  <textarea rows="2" placeholder="Message Lemonade…"></textarea>
  <div class="row">
    <span class="lm-pill">Llama 3.1 8B</span>
    <button class="lm-send-btn">➤</button>
  </div>
</div>
```

- `.lm-msg.user` — outlined bubble, right-aligned.
- `.lm-msg.assistant` — borderless, left-aligned, tertiary text.
- `.lm-composer` — rounded input shell; border brightens on focus-within.

---

## Toasts

```html
<div class="lm-toast-container">
  <div class="lm-toast success">
    <span class="icon">✓</span>
    <span class="msg">Model loaded successfully.</span>
    <button class="close">✕</button>
  </div>
</div>
```

Types: `success`, `info`, `warning`, `error` — each sets a colored border + tinted gradient surface.
The container fixes them bottom-right and stacks newest-on-bottom. See `portfolio/js/app.js` for a
minimal show/auto-dismiss implementation you can copy.

---

## Spinner

```html
<div class="lm-spinner"></div>
```

24px ring with a lemon-yellow leading edge; spins at 1s linear. Resize via `width`/`height`.

---

## Naming conventions (for new components)

- Prefix every reusable class with `lm-`.
- State/variant modifiers are plain words appended as separate classes: `lm-dot connected`,
  `lm-btn lm-btn-accent`, `lm-toast error`.
- Read all colors/radii/motion from `var(--token)`. If a needed token is genuinely missing, add it
  to `tokens.css` (both themes) rather than hardcoding.
