const db = require('../config/db');

const createBookingsTable = () => {
  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    hall_name TEXT,
    booking_date TEXT,
    payment_method TEXT,
    status TEXT DEFAULT 'Новая',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);
};

const createReviewsTable = () => {
  db.run(`CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    booking_id INTEGER,
    user_id INTEGER,
    text TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(booking_id) REFERENCES bookings(id)
  )`);
};

module.exports = { 
  createBookingsTable, 
  createReviewsTable 
};