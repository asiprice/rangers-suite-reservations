const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const { getDatabasePath, getEnvironment } = require('../shared/environment');

const environment = getEnvironment();
const dbPath = getDatabasePath();

// Ensure database directory exists (important for Replit)
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log(`📁 Created database directory: ${dbDir}`);
}

console.log(`💾 Database path: ${dbPath} (${environment} environment)`);
const db = new sqlite3.Database(dbPath);

const initializeDatabase = () => {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        opponent TEXT NOT NULL,
        start_time TEXT NOT NULL,
        suite_capacity INTEGER DEFAULT 10
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        game_id INTEGER,
        guest_name TEXT NOT NULL,
        contact_info TEXT,
        party_size INTEGER NOT NULL,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(game_id) REFERENCES games(id)
      )
    `);

    seedGames();
  });
};

const seedGames = () => {
  // Check if games already exist
  db.get('SELECT COUNT(*) as count FROM games', (err, row) => {
    if (err) {
      console.error('Error checking game count:', err);
      return;
    }
    
    if (row.count > 0) {
      console.log(`📊 Database already has ${row.count} games - skipping seed`);
      return;
    }
    
    console.log('🌱 Seeding database with Rangers games...');
    
    const games = [
      ['2025-08-22', 'Cleveland Guardians', '7:05 PM'],
      ['2025-08-23', 'Cleveland Guardians', '6:05 PM'],
      ['2025-08-24', 'Cleveland Guardians', '1:35 PM'],
      ['2025-08-25', 'Los Angeles Angels', '7:05 PM'],
      ['2025-08-26', 'Los Angeles Angels', '7:05 PM'],
      ['2025-08-27', 'Los Angeles Angels', '7:05 PM'],
      ['2025-09-05', 'Houston Astros', '7:05 PM'],
      ['2025-09-06', 'Houston Astros', '6:15 PM'],
      ['2025-09-07', 'Houston Astros', '3:35 PM'],
      ['2025-09-08', 'Milwaukee Brewers', '8:05 PM'],
      ['2025-09-09', 'Milwaukee Brewers', '8:05 PM'],
      ['2025-09-10', 'Milwaukee Brewers', '2:35 PM'],
      ['2025-09-19', 'Miami Marlins', '8:05 PM'],
      ['2025-09-20', 'Miami Marlins', '7:05 PM'],
      ['2025-09-21', 'Miami Marlins', '2:35 PM'],
      ['2025-09-23', 'Minnesota Twins', '8:05 PM'],
      ['2025-09-24', 'Minnesota Twins', '8:05 PM'],
      ['2025-09-25', 'Minnesota Twins', '2:35 PM']
    ];

    const stmt = db.prepare(`
      INSERT INTO games (date, opponent, start_time) 
      VALUES (?, ?, ?)
    `);

    games.forEach(game => {
      stmt.run(game);
    });

    stmt.finalize(() => {
      console.log(`✅ Seeded ${games.length} Rangers home games`);
    });
  });
};

module.exports = { db, initializeDatabase };