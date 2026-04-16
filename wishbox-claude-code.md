# Wishbox — Business Intelligence Website

## Project Overview

Build a single-page marketing website for **Wishbox**, a premium business intelligence firm. The aesthetic must be **dark, mysterious, and luxurious** — inspired by [blackcube.com](https://www.blackcube.com/). The site is in **English only**.

---

## Tech Stack

- **Framework**: Next.js (App Router) or plain HTML/CSS/JS — your choice
- **Styling**: Tailwind CSS or vanilla CSS with CSS variables
- **Fonts**: Google Fonts — `Cormorant Garamond` (display/headings) + `Montserrat` (body, light weights)
- **Animations**: Framer Motion (if Next.js) or vanilla CSS transitions
- **No external UI libraries** (no shadcn, no MUI)

---

## Visual Design Direction

### Color Palette
```
--black:        #050507
--dark:         #0a0a0f
--surface:      #0f0f16
--surface2:     #14141e
--gold:         #b8973a
--gold-light:   #d4b96a
--gold-dim:     #7a6128
--text:         #c8c8d8
--text-dim:     #6a6a88
--white:        #f0f0f8
```

### Typography
- **Headings**: Cormorant Garamond, weight 300–400, generous letter-spacing (`0.1em`–`0.3em`), italic accents
- **Body / Nav**: Montserrat, weight 200–300, uppercase for nav items, `letter-spacing: 0.2em`
- **Accent lines**: thin gold horizontal rules (`1px solid var(--gold-dim)`)

### Atmosphere
- Full-screen dark backgrounds, near-black
- Gold as the only accent color — used sparingly
- Subtle noise/grain texture overlay on hero (CSS or SVG filter)
- Slow fade-in animations on scroll (Intersection Observer or Framer Motion)
- Generous whitespace and negative space
- No gradients except subtle dark-to-dark on hero section
- Custom cursor: small gold dot

---

## Site Structure & Sections

### 1. Navigation (fixed, top)
- Logo: `WISHBOX` in Cormorant Garamond, spaced caps, gold
- Links: `About` · `Services` · `Methodology` · `Contact`
- Nav background: transparent → dark blur on scroll
- CTA button: `CONTACT US` — outlined in gold, no fill

### 2. Hero Section (100vh)
- Headline: `We find what others cannot see.`
  - Large, Cormorant Garamond italic, weight 300, ~80–100px
- Subheadline: `Strategic intelligence for those who cannot afford to be wrong.`
  - Montserrat, weight 200, letter-spaced, muted gold
- Scroll indicator: thin animated line pointing down
- Background: deep black with subtle animated particle field (canvas) or static dark texture

### 3. About Section
```
WISHBOX is a premier business intelligence firm operating at the intersection 
of human insight and analytical precision. Founded by veterans of elite 
intelligence units, we deliver strategic clarity to corporations, law firms, 
and sovereign entities navigating complex, high-stakes environments.

We operate where conventional research ends.
```
- Layout: centered text, max-width 720px, large serif font
- Thin gold line above section title

### 4. Services Section
Six service cards in a 2×3 or 3×2 grid:

| Service | Description |
|---|---|
| Litigation Support | Uncover hidden assets, trace financial flows, locate key witnesses |
| Corporate Due Diligence | Deep-profile investigations before deals, partnerships, or acquisitions |
| Counter-Intelligence | Identify leaks, hostile surveillance, and corporate espionage |
| Asset Tracing & Recovery | Follow the trail of misappropriated funds across borders |
| Negative Campaign Investigations | Expose coordinated disinformation and reputational attacks |
| Strategic Advisory | Ongoing intelligence partnerships for complex operating environments |

**Card design:**
- Dark surface background (`var(--surface2)`)
- Thin 1px gold border, opacity 0.3
- Gold Roman numeral (I–VI) top-left
- Hover: border opacity 1, subtle gold glow, text brightens
- No icons — typography only

### 5. Methodology Section
- Full-width section, dark background
- Large italic quote:
  > *"Every engagement begins with a single question: What does our client need to win?"*
- Three columns below:
  - **HUMINT** — Human Intelligence operations
  - **OSINT** — Open Source Intelligence analysis
  - **TECHINT** — Technical intelligence & digital forensics
- Each column: gold number, short title, 2-line description

### 6. Why Wishbox (Stats / Pillars)
Four pillars in a horizontal row:
- `30+` Languages spoken by our operatives
- `6` Continents of active operations
- `100%` Legally compliant methodologies
- `Est. 2010` Trusted by leading firms globally

Style: large gold number, small muted label below

### 7. Global Presence
Minimal table or location list:

- Tel Aviv · London · New York · Singapore · Zurich

Simple centered layout, each city separated by a thin gold dot `·`

### 8. Contact Section
- Headline: `Engage Wishbox`
- Subtext: *All initial consultations are strictly confidential.*
- Simple form: Name, Organization, Message, Submit
- Form style: borderless inputs, only bottom border in gold, dark background
- Submit button: outlined gold, hover fills gold with dark text
- Email: `intelligence@wishbox.com`

### 9. Footer
- `© 2025 Wishbox Ltd. All rights reserved.`
- Montserrat 200, very muted
- Thin gold line above

---

## Animations & Interactions

| Element | Animation |
|---|---|
| Page load | Fade in logo + nav, staggered 0.2s delay |
| Hero headline | Slow fade-up, 1s ease |
| Sections | Fade-in on scroll (Intersection Observer, threshold 0.15) |
| Service cards | Stagger in with 0.1s delay per card |
| Nav on scroll | Background transitions to `rgba(5,5,7,0.9)` + backdrop blur |
| Cursor | Small gold dot follows mouse, scales up on hover over links |
| Form inputs | Gold bottom border animates in on focus |

---

## File Structure (if Next.js)

```
/app
  layout.tsx
  page.tsx
/components
  Navbar.tsx
  Hero.tsx
  About.tsx
  Services.tsx
  Methodology.tsx
  Pillars.tsx
  Locations.tsx
  Contact.tsx
  Footer.tsx
  Cursor.tsx
/styles
  globals.css
```

---

## Key Design Rules

1. **Never** use purple gradients or generic "AI" aesthetics
2. **Never** use white backgrounds anywhere
3. Gold is used for accents only — not fills or large areas
4. All caps for section labels (`SERVICES`, `ABOUT`, `METHODOLOGY`)
5. Serif (Cormorant) for emotional/headline moments, sans (Montserrat) for UI/data
6. Whitespace is intentional — resist the urge to fill space
7. The site should feel like it was designed for a client who cannot be named

---

## Inspiration Reference

- [blackcube.com](https://www.blackcube.com/) — structure and tone
- Think: McKinsey meets MI6
