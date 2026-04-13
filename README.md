# Harry Potter Fan App

A Harry Potter-themed web application built with React 19, TypeScript, and Vite. Explore Hogwarts houses, discover iconic characters, browse spells, and take a sorting quiz to find your house.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Pages](#pages)
- [Components](#components)
- [Layouts](#layouts)
- [API Layer](#api-layer)
- [Types](#types)
- [Assets](#assets)
- [Utils](#utils)
- [Configuration](#configuration)
- [Deployment](#deployment)

---

## Overview

The app consists of six main sections navigable from the top nav:

| Route | Section |
|---|---|
| `/` | Home — hero landing with a call to action |
| `/faculties` | Faculties — overview of all four Hogwarts houses |
| `/faculty/:name` | Faculty detail — deep-dive into a single house |
| `/characters` | Characters — featured Harry Potter characters from the Potter DB API |
| `/spells` | Spells — searchable list of spells from the HP API |
| `/quiz` | Sorting Quiz — answer questions to discover your house |
| `/quiz-result` | Quiz Result — display the house assigned by the quiz |

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 19.2 | UI library |
| React Router | 7.13 | Client-side routing |
| TypeScript | 5.9 | Static typing |
| Vite | 8.0 | Dev server and bundler |
| Biome | 2.4 | Linting and formatting |
| ESLint | 9 | Additional static analysis (editor integration) |
| react-icons | 5.6 | Icon components |

External APIs (no API key required):
- [Potter DB](https://potterdb.com) — character data
- [HP API](https://hp-api.onrender.com) — spell data

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Format code
npm run format

# Lint and auto-fix
npm run lint

# Lint + format combined check
npm run lint:check
```

---

## Project Structure

```
src/
├── main.tsx                        # App entry point
├── App.tsx                         # Root router setup
├── api/                            # External API calls and caching
│   ├── potterDb.ts
│   └── hpSpells.ts
├── assets/
│   ├── main.css                    # Global styles and CSS custom properties
│   ├── icons/                      # SVG icon files
│   └── images/                     # Image imports and barrel files
├── components/                     # Reusable UI components
│   ├── characters/CharacterCard
│   └── faculties/FacultyCard
├── enums/
│   └── Faculties.enum.ts
├── layouts/
│   └── MainLayout                  # Persistent app shell
├── pages/
│   ├── Home/
│   ├── Faculties/
│   │   ├── Faculties.tsx
│   │   └── facultiesList.ts        # Static house data
│   ├── Faculty/
│   ├── Characters/
│   ├── Spells/
│   ├── Quiz/
│   │   ├── Quiz.tsx
│   │   └── quizData.ts             # Questions and scoring logic
│   ├── QuizResult/
│   └── 404/
├── types/                          # Shared TypeScript types
└── utils/                          # Pure utility functions
```

---

## Pages

### `Home` — `/`

Landing page introducing the app. Contains a hero section with a call-to-action button that directs users to the sorting quiz. Decorative imagery (a trophy cup and a magical prop) sets the wizarding atmosphere.

### `Faculties` — `/faculties`

Displays a 2-column responsive grid of all four Hogwarts houses (Gryffindor, Slytherin, Hufflepuff, Ravenclaw) using the `FacultyCard` component. Clicking a card navigates to that house's detail page. The static house list is defined in `facultiesList.ts` as `FACULTIES_LIST`, which couples each house name with its card image and motto.

### `Faculty` — `/faculty/:name`

Dynamic detail page for a specific house, driven by the URL param `:name` (a value from `EFaculty`). Shows the house motto, background image, house relic details, and news items. If an invalid house name is provided, the user is redirected to `/faculties`.

### `Characters` — `/characters`

Fetches a curated list of 10 featured Harry Potter characters from the Potter DB API on mount. Shows a loading state, an error message if the fetch fails, or a grid of `CharacterCard` components.

### `Spells` — `/spells`

Fetches all spells from the HP API on mount and renders them as cards. Includes a client-side search bar that filters spells by name in real time. Each card displays the spell name, effect, and a badge indicating whether the spell is "Forbidden" (Unforgivable Curses) or "Approved."

### `Quiz` — `/quiz`

A 6-question personality quiz. Each question presents four radio-button options mapped to a Hogwarts house. On submission, answers are validated (all questions must be answered), the winning house is calculated via `facultyFromQuizAnswers` from `quizData.ts`, and the user is navigated to `/quiz-result` with the answers passed via router state.

The quiz logic lives entirely in `quizData.ts`:

- `QUIZ_QUESTIONS` — the array of `QuizQuestion` objects shown in the UI.
- `facultyFromQuizAnswers(answers)` — tallies the selected option indices (0 = Slytherin, 1 = Gryffindor, 2 = Ravenclaw, 3 = Hufflepuff) and returns the `Faculty` with the highest count. Ties are broken in Gryffindor → Slytherin → Ravenclaw → Hufflepuff order.

### `QuizResult` — `/quiz-result`

Reads the quiz answers from router location state. If the state is missing or incomplete the user is redirected back to `/quiz`. Otherwise it displays the assigned house using a `FacultyCard`.

### `404` — `*`

Catch-all not-found page with a link back to the home page.

---

## Components

### `CharacterCard` — `src/components/characters/`

Presentational card for a single `PotterCharacter`. Displays the character's image (loaded lazily with `referrerPolicy="no-referrer"`) or a placeholder if no image is available. The character name is rendered as an `<h2>` with proper `aria-labelledby` for accessibility. Hover animation respects `prefers-reduced-motion`.

### `FacultyCard` — `src/components/faculties/`

Presentational card for a single `Faculty`. Shows the house image, name, and description. Clicking navigates to `/faculty/:name`. House-specific gradient accents are applied via CSS custom properties and a BEM modifier derived from the house name (e.g. `.faculty-card--gryffindor`).

---

## Layouts

### `MainLayout` — `src/layouts/`

The persistent app shell rendered as the parent `<Route>` for every page. Contains:

- **Header** — sticky top bar with the Hogwarts logo, navigation links (`Home`, `Faculties`, `Characters`, `Spells`), and decorative search/user icon buttons. `NavLink` active-state logic groups related routes (e.g. `/quiz` and `/quiz-result` both activate the "The Archive" concept; `/faculty/*` activates "Faculties").
- **`<Outlet />`** — where child page content is rendered.
- **Footer** — house logo and placeholder links.

---

## API Layer

### `potterDb.ts` — `src/api/`

Fetches character data from the [Potter DB REST API](https://potterdb.com).

- `FEATURED_CHARACTER_SLUGS` — a hardcoded list of 10 character slugs to fetch (e.g. `harry-potter`, `hermione-granger`).
- `fetchPotterDbCharactersBySlugs` — fetches each slug individually at `/v1/characters/{slug}`. Responses are cached using the browser **Cache API** (`caches.open("potter-db-cache")`) so repeated visits avoid redundant network requests. The JSON:API response shape is mapped to the internal `PotterCharacter` type.
- `fetchFeaturedPotterCharacters` — convenience wrapper that calls the above with `FEATURED_CHARACTER_SLUGS`.

### `hpSpells.ts` — `src/api/`

Fetches spell data from the [HP API](https://hp-api.onrender.com).

- Endpoint: `https://hp-api.onrender.com/api/spells`
- Responses are cached using the **Cache API** (`hp-spells-cache`).
- The API's `{ id, name, description }` shape is mapped to `SpellRow` with `effects` (from `description`) and a `status` field: `"Forbidden"` for the three Unforgivable Curses, `"Approved"` for everything else.
- A numeric `id` is assigned as `index + 1`.

---

## Types

All types live under `src/types/`.

| File | Exports | Description |
|---|---|---|
| `Faculty.type.ts` | `Faculty` | Name, image, and description for a house card |
| `character.type.ts` | `PotterCharacter` | Id, name, image URL for a character card |
| `quiz.type.ts` | `QuizQuestion`, `QuizResultLocationState` | Quiz question shape and the router state passed to the result page |
| `spell.type.ts` | `SpellRow`, `SpellStatus` | Spell data shape and the `"Forbidden" \| "Approved"` union |

---

## Assets

### `src/assets/main.css`

Global stylesheet. Includes CSS reset, `#root` min-height, and a library of CSS custom properties that define the Harry Potter color theme — background colors, card colors, house-specific gradients, and typography tokens used across all components.

### `src/assets/images/`

Centralised image imports to avoid repetitive relative paths throughout components.

| File | Exports | Contents |
|---|---|---|
| `index.ts` | Re-exports all image modules | Barrel file |
| `home.ts` | `HOME_IMAGES` | `cup-home.png`, `magic-home.png` |
| `facultyCards.ts` | `FACULTY_CARD_IMAGES` | `Record<EFaculty, string>` — card images for each house |
| `facultyPages.ts` | `FACULTY_PAGE_ASSETS` | Per-house object with `background`, `logo`, and `relic` PNG paths |
| `layout.ts` | Layout images | Header logo, footer logo, search and user SVG icons (re-exported from `src/assets/icons/`) |
| `deer.jpg` | (raw asset) | Full-width decorative background used across all main pages |

### `src/assets/icons/`

SVG icons used in the header: `search.svg` and `user.svg`. Both are re-exported through `layout.ts` so the rest of the codebase imports them from a single place.

---

## Utils

### `filterSpellsByName` — `src/utils/spells.ts`

Pure function that takes a spell list and a query string, trims whitespace, and returns only spells whose name contains the query (case-insensitive substring match). Used by the `Spells` page for client-side search without any additional library.

---

## Enums

### `EFaculty` — `src/enums/Faculties.enum.ts`

String enum with values `gryffindor`, `slytherin`, `hufflepuff`, `ravenclaw`. Used as the source of truth for house identifiers across routing, image maps, CSS modifiers, and the quiz scoring logic.

---

## Configuration

| File | Purpose |
|---|---|
| `vite.config.ts` | Vite build config with `@vitejs/plugin-react` |
| `tsconfig.json` | TypeScript project references root |
| `tsconfig.app.json` | App TypeScript config — ES2023, strict mode, bundler module resolution |
| `tsconfig.node.json` | TypeScript config for Vite config file (Node context) |
| `biome.json` | Biome linter and formatter rules for TS/TSX; organise imports on assist |
| `index.html` | App entry HTML — Google Fonts (Cormorant Garamond, Tenor Sans, Tienne, Tilt Neon), favicon, root div |
| `vercel.json` | SPA catch-all rewrite: all paths → `index.html` |

---

## Deployment

The project is configured for **Vercel**. The `vercel.json` rewrite rule ensures that direct navigation to any route (e.g. `/characters`) correctly serves `index.html` and lets React Router handle the path client-side.

To deploy manually:

```bash
npm run build
# Upload or deploy the dist/ folder to any static hosting provider
```
