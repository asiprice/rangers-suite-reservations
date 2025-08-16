const express = require('express');
const cors = require('cors');
const { db, initializeDatabase } = require('./database');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});