import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const db = new Database(join(__dirname, 'database.db'));

app.use(cors());
app.use(express.json());

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS examples (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    letter TEXT NOT NULL,
    word_en TEXT NOT NULL,
    word_es TEXT NOT NULL,
    image_url TEXT NOT NULL,
    audio_en TEXT,
    audio_es TEXT,
    syllable TEXT NOT NULL,
    type TEXT NOT NULL
  );
`);

// API Routes
app.get('/api/examples/:letter', (req, res) => {
  const { letter } = req.params;
  const examples = db.prepare(
    'SELECT * FROM examples WHERE letter = ? ORDER BY syllable'
  ).all(letter);
  res.json(examples);
});

app.get('/api/vowels/:letter', (req, res) => {
  const { letter } = req.params;
  const examples = db.prepare(
    "SELECT * FROM examples WHERE letter = ? AND type = 'vowel'"
  ).all(letter);
  res.json(examples);
});

app.get('/api/consonants/:letter', (req, res) => {
  const { letter } = req.params;
  const examples = db.prepare(
    "SELECT * FROM examples WHERE letter = ? AND type = 'consonant'"
  ).all(letter);
  res.json(examples);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});