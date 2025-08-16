const express = require('express');
const cors = require('cors');
const path = require('path');
const { db, initializeDatabase } = require('./database');
const { getPort, getCorsOrigins, getEnvironment } = require('../shared/environment');

const app = express();
const PORT = getPort(3001);
const environment = getEnvironment();

console.log(`🚀 Starting server in ${environment} environment`);
console.log(`📡 Port: ${PORT}`);
console.log(`🌐 CORS origins:`, getCorsOrigins());

// Configure CORS based on environment
app.use(cors({
  origin: getCorsOrigins(),
  credentials: true
}));

app.use(express.json());

// Health check endpoint for Replit
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    environment,
    timestamp: new Date().toISOString() 
  });
});

// Serve frontend static files in Replit
if (environment === 'replit') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
}

initializeDatabase();

app.get('/api/games', (req, res) => {
  db.all(`
    SELECT g.*, 
           COALESCE(SUM(r.party_size), 0) as reserved_spots,
           (g.suite_capacity - COALESCE(SUM(r.party_size), 0)) as available_spots
    FROM games g
    LEFT JOIN reservations r ON g.id = r.game_id
    GROUP BY g.id
    ORDER BY g.date
  `, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/games/:id/reservations', (req, res) => {
  const gameId = req.params.id;
  db.all(
    'SELECT * FROM reservations WHERE game_id = ? ORDER BY created_at',
    [gameId],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    }
  );
});

app.post('/api/reservations', (req, res) => {
  const { game_id, guest_name, contact_info, party_size, notes } = req.body;
  
  db.get(
    `SELECT g.suite_capacity, COALESCE(SUM(r.party_size), 0) as reserved_spots
     FROM games g
     LEFT JOIN reservations r ON g.id = r.game_id
     WHERE g.id = ?
     GROUP BY g.id`,
    [game_id],
    (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      const available = row.suite_capacity - row.reserved_spots;
      if (party_size > available) {
        res.status(400).json({ 
          error: `Not enough space. Only ${available} spots available.` 
        });
        return;
      }
      
      db.run(
        'INSERT INTO reservations (game_id, guest_name, contact_info, party_size, notes) VALUES (?, ?, ?, ?, ?)',
        [game_id, guest_name, contact_info, party_size, notes],
        function(err) {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json({ id: this.lastID });
        }
      );
    }
  );
});

app.put('/api/reservations/:id', (req, res) => {
  const { guest_name, contact_info, party_size, notes } = req.body;
  const reservationId = req.params.id;
  
  db.run(
    'UPDATE reservations SET guest_name = ?, contact_info = ?, party_size = ?, notes = ? WHERE id = ?',
    [guest_name, contact_info, party_size, notes, reservationId],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ changes: this.changes });
    }
  );
});

app.delete('/api/reservations/:id', (req, res) => {
  const reservationId = req.params.id;
  
  db.run(
    'DELETE FROM reservations WHERE id = ?',
    [reservationId],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ changes: this.changes });
    }
  );
});

// In Replit, serve React app for any non-API routes
if (environment === 'replit') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  const serverUrl = environment === 'replit' 
    ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
    : `http://localhost:${PORT}`;
    
  console.log(`✅ Server running at ${serverUrl}`);
  console.log(`🏥 Health check: ${serverUrl}/health`);
  console.log(`🎮 API base: ${serverUrl}/api`);
});