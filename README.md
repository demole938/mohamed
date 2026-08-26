# Mohamed Ibrahem — Portfolio (Media Buyer)

One-page dark cinematic portfolio with a scroll-scrubbed (ping-pong) video
background, projects gallery, and CV download.
Stack: React + TypeScript + Vite + Tailwind CSS + lucide-react.

## IMPORTANT — one file to add before running

Copy your `hero.mp4` video into `public/hero.mp4` (it is NOT included in
this zip because of its size). Everything else is already in place.

## Run locally

```bash
npm install
npm run dev
```

Opens at http://localhost:5199

## What's included

- `public/cv.pdf` — resume, wired to the Download CV button
- `public/projects/` — 15 dashboard screenshots (8 used in the grid, rest are spares)
- `public/portrait.jpg` — placeholder; replace with your real photo (same name)
- Preloader with percentage counter (site mounts only after the video is 100% loaded)
- Ping-pong video scrub: forward through the first half of the page, reverse back
  to frame 1 through the second half
- Section Three (`#projects`): 8 glass-framed screenshots + Download CV CTA

## Links wired up

- All consultation CTAs → WhatsApp: https://wa.me/201060449876
- `View my work` → LinkedIn: https://www.linkedin.com/in/mohamed-ibrahem-mk/
- `Download CV` → /cv.pdf

## Deploy (Vercel)

Push this folder to a GitHub repo (files at repo root, including hero.mp4
inside public/), then import the repo in Vercel — it auto-detects Vite.
