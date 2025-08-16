# Texas Rangers Suite Reservation Management

A simple web application to manage reservations for your company's Texas Rangers baseball suite.

## Features

- View upcoming Rangers home games
- Create, edit, and delete reservations
- Track suite capacity and availability
- Responsive design with Rangers team colors

## Technology Stack

- **Backend**: Node.js with Express and SQLite
- **Frontend**: React with TypeScript
- **Database**: SQLite (local file-based)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Install backend dependencies:
```bash
cd backend
npm install
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```
The backend will run on http://localhost:3001

2. Start the frontend development server:
```bash
cd frontend
npm start
```
The frontend will run on http://localhost:3000

### Usage

1. Open http://localhost:3000 in your browser
2. Select a game from the list on the left
3. View current reservations for that game
4. Click "Add Reservation" to create a new reservation
5. Edit or delete existing reservations as needed

The application automatically tracks suite capacity and prevents overbooking.

## Database

The SQLite database (`rangers_suite.db`) is created automatically when you first run the backend. It includes sample Rangers games for testing.

## Future Enhancements

- User authentication and authorization
- Cloud deployment and hosting
- Email notifications for reservations
- Calendar integration
- Reporting and analytics