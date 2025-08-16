# 🚀 Texas Rangers Suite Reservation System - Replit Setup

This project is designed to run seamlessly both **locally** and in **Replit**. The system automatically detects its environment and configures itself accordingly.

## 🌟 Features

- ✅ **Smart Environment Detection**: Automatically detects Local vs Replit
- ✅ **Dynamic API Configuration**: Backend URLs adapt to environment
- ✅ **Database Path Management**: SQLite database stored in appropriate location
- ✅ **CORS Configuration**: Environment-specific allowed origins
- ✅ **Multi-Platform**: Web app, mobile app, and API all included

## 🏃‍♂️ Quick Start in Replit

### 1. **Import to Replit**
- Go to [replit.com](https://replit.com)
- Click "Create Repl" → "Import from GitHub"
- Use: `https://github.com/YOUR_USERNAME/rangers-suite-reservations`

### 2. **Run the Project**
```bash
# The .replit file automatically runs this:
cd backend && npm install && npm start
```

### 3. **Access the Applications**

**Main Web App**: `https://your-repl-name.your-username.repl.co`
**API Health Check**: `https://your-repl-name.your-username.repl.co/health`
**API Base**: `https://your-repl-name.your-username.repl.co/api`

## 🔧 Environment Configuration

The system uses these environment variables:

### Replit (Auto-detected)
- `REPL_SLUG` - Your repl name
- `REPL_OWNER` - Your username
- `PORT` - Server port (auto-assigned by Replit)

### Local Development
- `NODE_ENV=development`
- `PORT=3001`
- `EXPO_PUBLIC_LOCAL_IP` - Your computer's IP for mobile testing

## 📱 Mobile App Configuration

### For Expo Go Testing
1. **Update environment variables** in your Replit:
   ```bash
   # Add this to your Replit secrets:
   EXPO_PUBLIC_REPLIT_URL=https://your-repl-name.your-username.repl.co
   ```

2. **Run mobile app**:
   ```bash
   cd RangersReservationExpo
   npm run replit
   ```

3. **Test with Expo Go**:
   - Install Expo Go on your phone
   - Scan QR code from Replit console
   - App connects to Replit backend automatically!

## 🗄️ Database

### Replit
- **Path**: `/home/runner/data/rangers_suite.db`
- **Persistence**: Data survives repl restarts
- **Auto-creation**: Database and directory created automatically

### Local
- **Path**: `./backend/rangers_suite.db`
- **Git ignored**: Database file not committed to git

## 🌐 API Endpoints

All endpoints work in both environments:

- `GET /health` - Health check
- `GET /api/games` - List all games
- `GET /api/games/:id/reservations` - Game reservations
- `POST /api/reservations` - Create reservation
- `PUT /api/reservations/:id` - Update reservation
- `DELETE /api/reservations/:id` - Delete reservation

## 🔍 Environment Detection Logic

```javascript
// Backend
const isReplit = !!(process.env.REPL_SLUG && process.env.REPL_OWNER);

// Frontend
const isReplit = window.location.hostname.includes('repl.co');

// Mobile
const isReplit = !!(process.env.EXPO_PUBLIC_REPLIT_URL);
```

## 🚨 Troubleshooting

### Database Issues
```bash
# Check database path
curl https://your-repl.repl.co/health

# Recreate database
rm -f /home/runner/data/rangers_suite.db
# Restart repl
```

### CORS Issues
- Check console for CORS errors
- Verify URL matches in environment detection
- Ensure frontend and backend on same domain in Replit

### Mobile App Connection
- Verify `EXPO_PUBLIC_REPLIT_URL` is set correctly
- Check Replit console for API logs
- Test API directly: `https://your-repl.repl.co/api/games`

## 🎯 Local Development

### Backend
```bash
cd backend
npm install
npm start
# Runs on http://localhost:3001
```

### Frontend
```bash
cd frontend
npm install
npm start
# Runs on http://localhost:3000
```

### Mobile
```bash
cd RangersReservationExpo
npm install
npm start
# Runs Expo dev server
```

## 📊 Project Structure

```
/
├── backend/           # Node.js API server
├── frontend/          # React web app  
├── RangersReservationExpo/ # React Native mobile app
├── shared/           # Environment utilities
├── .replit          # Replit configuration
├── replit.nix       # Nix packages
└── .env.example     # Environment variables
```

## 🎉 Success Indicators

✅ **Backend Running**: Health check returns environment info
✅ **Frontend Loading**: Rangers logo and game list appear
✅ **Mobile Connected**: Game list loads in Expo Go
✅ **Database Working**: Can create/edit reservations
✅ **CORS Configured**: No console errors

Your Texas Rangers Suite Reservation System is now running in Replit! 🏟️⚾