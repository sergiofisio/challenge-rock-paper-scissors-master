# Frontend Mentor - Rock, Paper, Scissors solution

This is a solution to the [Rock, Paper, Scissors challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rock-paper-scissors-game-pTgwgvgH). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Getting started](#getting-started)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the game depending on their device's screen size
- Play **Rock, Paper, Scissors, Lizard, Spock** against the house
- Follow the full match flow: pick → waiting → house reveal → result
- See a winner glow on the winning hand and update the score
- Keep the score after refreshing the browser (`localStorage`)
- Open and close a rules modal

### Links

- Solution URL: [https://github.com/sergiofisio/challenge-rock-paper-scissors-master](https://github.com/sergiofisio/challenge-rock-paper-scissors-master)
- Live Site URL: [https://sergiofisio.github.io/challenge-rock-paper-scissors-master/](https://sergiofisio.github.io/challenge-rock-paper-scissors-master/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties / design tokens
- Flexbox and CSS Grid
- Mobile-first responsive layout
- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4
- Client-side game state with timed step transitions
- Static export + GitHub Actions → GitHub Pages

### What I learned

- Recreating the 3D token look with layered shadows: color lip under the ring, inset shadow on the white face, and soft ambient drop shadow
- Modeling Rock–Paper–Scissors–Lizard–Spock win rules as a small lookup map instead of a long chain of conditionals
- Keeping `localStorage` SSR-safe in Next.js by hydrating score in `useEffect` before writing back
- Shipping a Next.js app to GitHub Pages with `output: "export"`, `basePath`, and a Pages workflow

### Continued development

- Closer pixel polish against mobile/tablet mocks
- Motion for pick → result transitions
- Optional classic (triangle) mode alongside the bonus pentagon

### Useful resources

- [Frontend Mentor challenge brief](https://www.frontendmentor.io/challenges/rock-paper-scissors-game-pTgwgvgH) — requirements and bonus rules
- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports) — GitHub Pages-friendly build
- [Big Bang Theory: Rock Paper Scissors Lizard Spock](https://bigbangtheory.fandom.com/wiki/Rock-Paper-Scissors-Lizard-Spock) — bonus hand relationships

## Getting started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
yarn build   # static export to /out (set GITHUB_PAGES=true for Pages basePath)
yarn lint
```

## Author

- GitHub - [@sergiofisio](https://github.com/sergiofisio)

## Acknowledgments

- Design and assets from [Frontend Mentor](https://www.frontendmentor.io)
