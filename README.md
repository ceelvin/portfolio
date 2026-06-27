# Celvin Kuhn — Portfolio

Personal portfolio site for **Celvin Kuhn**, Full Stack Developer & UI/UX Designer.  
Built with Next.js 15, TypeScript, and Tailwind CSS v4.

Live site content covers hero, about, projects, and contact — with a space-themed interactive background, terminal panel, and Neovim-style keyboard navigation.

## Features

- **Hero** — intro, CTAs, and an interactive boot terminal with custom commands
- **About** — bio, filterable skills (core vs. learning), expandable career timeline
- **Projects** — filterable project cards with cover images and tech tags
- **Contact** — mailto form (opens the visitor's email client with a pre-filled message)
- **Starry background** — canvas animation with mouse-following ship (dark & light mode)
- **Vim keybindings** — `j`/`k`, `gg`, `G`, `gh`/`ga`/`gp`/`gc`, `?` for help
- **Theme toggle** — dark (default) and light mode
- **Scroll progress** and **back-to-top** button

## Tech Stack

| Layer | Technologies |
|-------|----------------|
| Framework | [Next.js 15](https://nextjs.org) (App Router), React 19, TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com), shadcn/ui (Base UI) |
| Motion | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev) + custom brand SVGs |
| Theme | [next-themes](https://github.com/pacocoursey/next-themes) |
| Fonts | Inter, Space Grotesk (via `next/font`) |

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install & run

```bash
git clone https://github.com/ceelvin/portfolio.git
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server with Turbopack |
| `npm run dev:clean` | Clear `.next` cache and restart dev |
| `npm run dev:webpack` | Dev server without Turbopack |
| `npm run build` | Production build |
| `npm run start` | Serve production build (port 3000) |
| `npm run lint` | Run ESLint |

If hot reload breaks or you see stale chunk errors, stop all dev servers and run:

```bash
npm run dev:clean
```

## Project Structure

```
src/
├── app/                  # Next.js App Router (layout, catch-all section routes)
├── components/
│   ├── background/       # Starry canvas background
│   ├── interactive/      # Vim keybindings, scroll UI
│   ├── layout/           # Navbar, footer
│   ├── providers/        # Theme & app providers
│   ├── sections/         # Hero, about, projects, contact
│   └── ui/               # shadcn/ui primitives
├── data/
│   └── site.ts           # All site content (config, skills, projects, journey)
├── hooks/                # Section navigation, vim keys, active section, background ship
└── lib/                  # Section routing, terminal commands, utilities
public/
└── images/               # Profile & project images
```

## Customization

Most content lives in a single file:

**`src/data/site.ts`**

- `siteConfig` — name, title, email, social links, availability flag
- `navLinks` — navbar section links
- `skills` — technologies with `core` / `learning` proficiency
- `journey` — work history timeline
- `projects` — portfolio entries (title, description, tech, image, links)
- `bio` — summary, highlights, stats

Section URLs map to scroll targets on the single-page layout (`/`, `/about`, `/projects`, `/contact`).

## Production

Build and run locally or on any Node.js host:

```bash
npm run build
npm run start
```

The app listens on port **3000** by default. Set `PORT` to override:

```bash
PORT=8080 npm run start
```

For a reverse proxy (nginx, Caddy, etc.), point traffic to the Next.js process and proxy WebSocket/HMR only in development.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `j` / `k` | Scroll down / up |
| `gg` | Scroll to top |
| `G` | Scroll to bottom |
| `gh` / `ga` / `gp` / `gc` | Jump to Home / About / Projects / Contact |
| `?` | Toggle Vim help overlay |

## License

Private portfolio project. All rights reserved.

## Contact

- **Email:** contact@celvin.dev
- **GitHub:** [ceelvin](https://github.com/ceelvin)
- **LinkedIn:** [celvin-kuhn](https://linkedin.com/in/celvin-kuhn/)