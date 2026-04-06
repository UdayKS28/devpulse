# DevPulse

A GitHub developer activity dashboard built with React, Material UI, and the GitHub REST API.

## Live Demo
[Coming soon — Vercel link]

## Features
- Search any GitHub user and view their profile, repositories, and language breakdown
- Filter and sort repositories by language, stars, or last updated
- Trending repositories page — most starred repos from the last 30 days
- Save profiles locally — persists across sessions using localStorage
- Live GitHub API rate limit indicator in the navbar
- Loading skeletons and error handling throughout

## Tech Stack
- React 18 + Vite
- Material UI (MUI) v5
- React Router v6
- Recharts
- GitHub REST API

## Getting Started
```bash
git clone https://github.com/UdayKS28/devpulse.git
cd devpulse
npm install
npm run dev
```

## Project Structure
```
src/
├── api/          # GitHub API calls
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
├── pages/        # Page-level components
└── utils/        # Helper functions
```