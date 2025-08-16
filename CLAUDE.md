# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Texas Rangers Suite Reservation Management - a multi-platform application for managing reservations for a company's Texas Rangers baseball suite. The project includes web, React Native, and Expo mobile applications all sharing a common Node.js/Express backend with SQLite database.

## Architecture

### Multi-Platform Structure
- **backend/**: Node.js/Express API server with SQLite database
- **frontend/**: React web application (TypeScript)
- **RangersReservationApp/**: React Native mobile app
- **RangersReservationExpo/**: Expo mobile app
- **shared/**: Common environment utilities used across all platforms

### Database Schema
- **games**: Rangers home games with date, opponent, start_time, suite_capacity
- **reservations**: Guest reservations linked to games with party_size, contact info, notes

### Key Components
- Games are pre-seeded with actual Rangers 2025 schedule
- Suite capacity management prevents overbooking
- Shared environment detection handles local vs Replit deployment
- Cross-platform API client for consistent data access

## Development Commands

### Backend
```bash
cd backend
npm install
npm run dev          # Start with nodemon for development
npm start           # Production start
npm run replit      # Replit-specific startup with setup
```

### Frontend (Web)
```bash
cd frontend
npm install
npm start           # Development server (port 3000)
npm run build       # Production build
npm test            # Run tests
```

### React Native App
```bash
cd RangersReservationApp
npm install
cd ios && pod install && cd ..  # Required for iOS dependencies
npm start           # Metro bundler
npm run android     # Run on Android
npx react-native run-ios  # Run on iOS (use npx if CLI not installed globally)
npm run lint        # ESLint
npm test            # Jest tests
```

### Expo App
```bash
cd RangersReservationExpo
npm install
npm start           # Expo development server
npm run android     # Android via Expo
npm run ios         # iOS via Expo
npm run web         # Web version via Expo
```

## Environment Configuration

The shared environment utility (`shared/environment.js`) handles:
- **Local development**: Backend on :3001, Frontend on :3000
- **Replit deployment**: Single domain with routing
- **Database paths**: Replit uses `/home/runner/data/`, local uses `./`
- **CORS origins**: Automatically configured for each environment

## API Endpoints

- `GET /api/games` - List all games with reservation counts
- `GET /api/games/:id/reservations` - Get reservations for specific game
- `POST /api/reservations` - Create new reservation (validates capacity)
- `PUT /api/reservations/:id` - Update existing reservation
- `DELETE /api/reservations/:id` - Delete reservation
- `GET /health` - Health check endpoint

## Testing

- Frontend uses React Testing Library and Jest
- React Native uses Jest with React Native testing setup
- No backend tests currently implemented

## Replit Deployment

Special considerations for Replit environment:
- Database stored in persistent `/home/runner/data/` directory
- Setup script handles SQLite compilation issues
- Frontend build served statically by backend in production
- Environment detection via REPL_SLUG and REPL_OWNER variables

## Kill Server Process

If encountering "EADDRINUSE" errors on port 3001:
```bash
lsof -ti:3001 | xargs kill -9
```