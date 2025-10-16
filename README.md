# Master Shopping List

This React app is intended to create and manage shopping lists. Simple UI. Local persistence.

## Stack

- Vite (React, JS)
- React Router
- Local Storage

## Setup

Clone:

- SSH: `git clone git@github.com:locirin/master-shopping-list.git`
- HTTPS: `git clone https://github.com/locirin/master-shopping-list.git`

Install and run:

```bash
cd master-shopping-list
npm install
npm run dev
```

Open the local URL from the terminal (default http://localhost:5173).

## Env

- Example file: `.env.local.example`
- Do not commit `.env.local`

## App structure (min)

```text
src/
assets/
features/
pages/      # Home, ListDetail, NotFound
shared/     # ChildrenSection, Button
App.jsx
main.jsx
```

## Features

- Multiple lists
- Add items with qty/unit
- Toggle needed / in-pantry
- Favorites
- Client-side routing

## Implementation notes

- Functional components, one per file, PascalCase
- Controlled forms with simple validation
- Hooks: `useEffect` (load/save), `useCallback` (handlers)
- Stable keys (id) on lists
- No direct DOM access
- No component libraries
- Active route visibly styled

## Dependencies

- `react`, `react-dom`
- `react-router`, `react-router-dom`
- This app does not use any libraries that directly manipulate the DOM.

## Scripts

- `npm run dev` — start
- `npm run build` — production build
- `npm run preview` — preview build
