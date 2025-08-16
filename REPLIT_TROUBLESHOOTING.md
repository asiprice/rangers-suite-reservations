# 🚀 Replit Troubleshooting Guide

## 🔧 Quick Setup Commands

If the automatic setup doesn't work, run these manually in Replit console:

```bash
# Full setup (first time)
chmod +x start-replit.sh
./start-replit.sh
```

```bash
# Quick restart (if already set up)
cd backend && npm start
```

## 🌐 URL Patterns

Replit uses different URL patterns:

- **Development**: `https://[uuid].riker.replit.dev`
- **Deployed**: `https://your-repl-name.your-username.repl.co`

The app now detects both automatically!

## 🔍 Debug Steps

### 1. Check Backend Health
Visit: `[YOUR_REPLIT_URL]/health`

Should return:
```json
{
  "status": "healthy",
  "environment": "replit",
  "timestamp": "..."
}
```

### 2. Check API
Visit: `[YOUR_REPLIT_URL]/api/games`

Should return 18 Rangers games.

### 3. Check Frontend Logs
1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Look for:
   - `🔍 Hostname: [replit-domain]`
   - `🌍 Environment detected: replit`
   - `🎯 API URL: /api`

### 4. Common Issues

**"No games showing"**
- Check browser console for errors
- Verify API URLs work directly
- Check CORS errors

**"Database errors"**
- SQLite rebuild issue - run setup script again
- Check `/home/runner/data/` permissions

**"Port conflicts"**
- Restart the Repl
- Clear browser cache

## 🔄 Reset Commands

```bash
# Nuclear reset
rm -rf backend/node_modules frontend/node_modules
rm -rf backend/package-lock.json frontend/package-lock.json
./start-replit.sh
```

## 📱 Mobile App Testing

```bash
cd RangersReservationExpo
npm install
npm run web
```

Visit the Expo web URL to test mobile interface.

## ✅ Success Indicators

- ✅ Backend logs show "Server running at..."
- ✅ Health check returns JSON
- ✅ Frontend shows Rangers header
- ✅ Games list loads with team logos
- ✅ Can create/edit reservations
- ✅ Console shows environment detection logs