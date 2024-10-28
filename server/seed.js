import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { vowelExamples } from '../src/data/vowelExamples.js';
import { letterExamples } from '../src/data/letterExamples.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, 'database.db'));

// Clear existing data
db.exec('DELETE FROM examples');

// Insert vowel examples
Object.entries(vowelExamples).forEach(([letter, examples]) => {
  examples.forEach((example) => {
    db.prepare(`
      INSERT INTO examples (
        letter, word_en, word_es, image_url, audio_en, audio_es, syllable, type
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      letter,
      example.word.en,
      example.word.es,
      example.image,
      example.audioEn,
      example.audioEs,
      example.syllable,
      'vowel'
    );
  });
});

// Insert consonant examples
Object.entries(letterExamples).forEach(([letter, examples]) => {
  examples.forEach((example) => {
    db.prepare(`
      INSERT INTO examples (
        letter, word_en, word_es, image_url, audio_en, audio_es, syllable, type
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      letter,
      example.word.en,
      example.word.es,
      example.image,
      example.audioEn,
      example.audioEs,
      example.syllable,
      'consonant'
    );
  });
});