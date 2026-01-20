# Productivity Boost

A responsive, personal productivity web app that combines powerful task management with yearly, monthly, and daily goal setting. It features a beautiful, intuitive UI/UX designed for enjoyment and efficiency.

## Overview
Productivity Boost helps you:
- Add, edit, delete, view, search, and prioritize tasks (with description, due date, and priority weight).
- Define New Year resolutions, monthly goals, and daily goals.
- Track progress weekly, monthly, and yearly.

## Tech Stack
- Vite + React + TypeScript
- Tailwind CSS for modern, responsive UI
- Zustand for state management
- date-fns for date utilities
- React Testing Library + Vitest for unit tests

## Getting Started
1) Install dependencies
```
npm install
```
2) Run locally
```
npm run dev
```
3) Build
```
npm run build
```
4) Preview production build
```
npm run preview -- --host 127.0.0.1 --port 4175
```

## Features
- Task management: create, edit, delete, mark complete, prioritize, and search
- Goal setting: yearly resolutions, monthly goals, daily goals
- Progress tracking: weekly, monthly, yearly summaries
- Beautiful, responsive UI/UX

## Project Structure
- src/
  - components/: UI components
  - pages/: top-level screens (Dashboard, Tasks, Goals)
  - store/: Zustand stores (tasks, goals)
  - utils/: helpers (date + progress calculations)
  - test/: testing setup

## License
Personal use.
