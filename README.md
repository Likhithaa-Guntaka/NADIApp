
  # NADI — Mobile Wellness App Demo

NADI is a high-fidelity interactive prototype of a mobile wellness application built as a single-page React demo. Inspired by Indian wellness frameworks, it features 13 interconnected screens rendered inside a canvas/prototype viewer with a dev toolbar for rapid iteration.

## Overview

NADI ("pulse" in Sanskrit) is a conceptual wellness companion that blends biometric sensing, reflective journaling, and Ayurvedic energy principles into a cohesive mobile experience. The demo is built entirely in React — no backend, no native SDK — making it instantly shareable and inspectable.

## Screens

| Screen | Description |
|---|---|
| Splash / Onboarding | Animated entry with brand identity |
| Sign In | Apple & Google OAuth-style sign-in with brand mark SVGs |
| Home | Energy blob card with "Good afternoon, Dia." greeting and daily snapshot |
| Wristband | Biometric live data from a paired wearable |
| Restore | Personalized recovery suggestions ("Suggested for Dia now") |
| Revisit | Voice note journal with playback, transcript panels, trim editor, and share sheet |
| Ideas | Captured creative sparks linked to energy states |
| Profile | User settings including the theme picker |
| + 5 more | Additional flows for onboarding, permissions, and detail views |

## Features

- 13 interconnected screens navigated via a shared state machine — no router required
- Dark / Light / Auto theme system via ThemeCtx context and useColors() hook, toggled from Profile → Settings
- Voice note player with independent per-note state, animated waveform bars, inline transcript panels, and toast confirmations
- Trim editor bottom sheet with draggable handles and waveform visualization for voice note editing
- Native-style share sheet on Voice Notes
- Responsive scaling via a custom useResponsiveSc() hook that adapts the 390 × 844 pt canvas to any viewport
- Prototype viewer toolbar for device frame, zoom, and screen jumping during demos

## Design System

| Token | Value |
|---|---|
| Primary typeface | Josefin Sans (headings, weight 700) |
| Body typeface | Plus Jakarta Sans (weight 500) / DM Sans |
| Palette | Warm earth — terracotta, ochre, deep umber, ivory |
| Minimum body text | 15 px, line-height 1.6 |
| Icon library | Lucide React (no emoji) |

## Tech Stack

- React 18 — single App.tsx component, no routing library
- Tailwind CSS — utility-first styling with custom theme tokens
- Motion (motion/react) — micro-animations and transitions
- Lucide React — iconography
- Sonner — toast notifications
- Radix UI — accessible primitives (Dialog, Accordion, Tabs)

## Running Locally

```
npm install
npm run dev
```

Open http://localhost:5173. The app renders a phone-sized canvas centred in the browser window. Use the toolbar at the top to jump between screens or toggle the device frame.

## Project Structure

```
src/
├── app/
│   └── App.tsx          # All 13 screens in one component
├── styles/
│   ├── fonts.css        # Google Fonts imports
│   ├── theme.css        # Design tokens (colors, spacing, radius)
│   └── index.css        # Tailwind base + token mapping
```

## Status

This is a design prototype, not a production application. Data is fully mocked; no network requests are made. It is intended for design reviews, investor demos, and engineering handoff conversations.

## License

MIT — free to fork, remix, and learn from.
