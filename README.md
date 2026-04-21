# Rocket

A dark-purple game overlay dashboard built with React. Features three floating, draggable panels: a live GPU monitor, an image comparison tool, and a file bug decoder.

---

## Requirements

- [Node.js](https://nodejs.org/) v18 or v20+
- npm (comes with Node)

---

## Setup

```bash
# 1. Clone the repo
git clone https://github.com/nikhilusa1/overlay_dashboard.git
cd overlay_dashboard

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open **http://localhost:5173** in your browser.

---

## Features

### GPU Control Center
Shows simulated live graphics card stats that update every 1.5 seconds:
- **Temp** — GPU temperature (°C)
- **GPU** — Usage percentage
- **VRAM** — Video memory used (GB)
- **Fan** — Fan speed (RPM)

Each stat has a color-coded bar meter (green → yellow → red) and a live temperature line chart. A **Safe Zone** badge tells you if the GPU is within safe limits.

### Mini ICAT (Image Comparison Tool)
Drop two images side by side and compare them with a slider:
1. Click or drag an image into each drop zone
2. Once both are loaded, drag the center slider left/right to reveal one image vs the other
3. Edit the labels below each image
4. Click **Reset** to load new images

### Bug Decoder
Scan a filename to get a plain-language explanation of what that file type does and whether it needs attention:
1. Type a filename (e.g. `error.log`, `setup.exe`, `config.ini`)
2. Press **Enter** or click **Scan**
3. A result appears with a severity tag: `low` (green), `medium` (yellow), or `contact provider` (red)

---

## Using the Interface

| Action | How |
|--------|-----|
| Move a panel | Click and drag its title bar |
| Close a panel | Click the × button on the panel |
| Reopen a panel | Click its button in the bottom launcher bar |
| Active panel | Glows purple in the launcher bar |

---

## Project Structure

```
overlay_dashboard/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── styles/
    │   └── app.css
    └── components/
        ├── Desktop.jsx        — app shell, panel state, background grid
        ├── Panel.jsx          — reusable draggable glassmorphism card
        ├── LauncherBar.jsx    — bottom bar with panel toggle buttons
        ├── GPUPanel.jsx       — GPU stats with live simulation
        ├── ICATPanel.jsx      — dual image drop zones + slider comparison
        └── BugDecoderPanel.jsx — filename scanner with 15 file type patterns
```

---

## Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder. Serve it with any static file host.

---

## Tech Stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- Plain CSS (no UI library)
- Google Fonts — Inter + JetBrains Mono
