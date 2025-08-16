#!/bin/bash
# Replit startup script - runs both backend and frontend

echo "🚀 Starting Texas Rangers Suite Reservation System in Replit..."

# Function to run commands in background and track PIDs
run_service() {
    local name=$1
    local command=$2
    local dir=$3
    
    echo "📦 Starting $name..."
    cd "$dir"
    eval "$command" &
    local pid=$!
    echo "✅ $name started (PID: $pid)"
    return $pid
}

# Start backend
cd backend
echo "🔧 Setting up backend..."
chmod +x setup-replit.sh
./setup-replit.sh

echo "🖥️  Starting backend server..."
npm start &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"

# Wait a moment for backend to start
sleep 3

# Start frontend build process
cd ../frontend
echo "🎨 Installing frontend dependencies..."
npm install

echo "🏗️  Building frontend..."
npm run build

echo "🎉 Setup complete!"
echo ""
echo "📋 Services running:"
echo "   🖥️  Backend: PID $BACKEND_PID"
echo "   🌐 Frontend: Built and served by backend"
echo ""
echo "🔗 Access your app at the Replit preview URL"
echo "🏥 Health check: [YOUR_REPLIT_URL]/health"
echo "🎮 API: [YOUR_REPLIT_URL]/api"

# Keep the script running and monitor backend
wait $BACKEND_PID