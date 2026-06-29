# Compliment & Joke Generator

A responsive, animated web app that displays random compliments and jokes on a flipping playing card. Built with vanilla HTML, CSS, and JavaScript — no frameworks or libraries.

## Features

- **Playing card UI** — fixed-size card (standard 2.5:3.5 ratio) with a 3D flip animation
- **Compliments** — front face; random rank and red suit (♥ ♦) in the corners
- **Jokes** — back face; setup revealed on flip, punchline appears after a short delay; random rank and black suit (♠ ♣) in the corners
- **No-repeat joke queue** — all 15 jokes are shown once before any repeats, using a Fisher-Yates shuffled bag
- **Animated background** — four colour-cycling blobs drift slowly over a shifting gradient
- **Responsive** — scales down gracefully on small screens

## Project Structure

```
compliment-joke-generator/
├── index.html   — page structure and card markup
├── style.css    — all styling, animations, and layout
└── script.js    — data arrays, shuffle logic, flip and reveal behaviour
```

## Usage

Open `index.html` directly in any modern browser — no build step or server required.

- Click **Get a Compliment** to show a new compliment (flips back to the front face if needed)
- Click **Get a Joke** to flip the card and reveal a joke setup, with the punchline fading in after a pause

## Tech

- **Layout** — Flexbox, CSS `perspective` + `transform-style: preserve-3d` for the 3D flip
- **Fonts** — [Nunito](https://fonts.google.com/specimen/Nunito) (card text) and [Lato](https://fonts.google.com/specimen/Lato) (UI) via Google Fonts
- **Animations** — CSS `@keyframes` for gradient shift, blob colour cycling, blob movement, and punchline fade-in
- **Joke queue** — Fisher-Yates shuffle ensures full coverage before repeats, with a boundary check to prevent back-to-back repeats across cycles
