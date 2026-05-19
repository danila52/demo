const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../../database.sqlite'), (err) => {
  if (err) console.error('Ошибка подключения к БД:', err);
  else console.log('✅ Подключено к SQLite');
});

module.exports = db;