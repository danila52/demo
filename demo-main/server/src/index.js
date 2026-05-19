const express = require('express');
const cors = require('cors');

const db = require('./config/db');
const { createUsersTable } = require('./models/User');
const { createBookingsTable } = require('./models/Booking');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

createUsersTable();
createBookingsTable();

// Добавляем таблицу отзывов
const { createReviewsTable } = require('./models/Booking');
createReviewsTable();

// Создание админа
db.get("SELECT * FROM users WHERE login = 'Admin26'", (err, row) => {
  if (!row) {
    const bcrypt = require('bcryptjs');
    const hashed = bcrypt.hashSync('Demo20', 10);
    db.run(`INSERT INTO users (login, password, fio, phone, email, role) 
            VALUES ('Admin26', ?, 'Администратор', '0000000000', 'admin@banquetam.net', 'admin')`, [hashed]);
    console.log('👑 Админ создан: Admin26 / Demo20');
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => res.json({ message: 'Banquetam.Net Server работает ✅' }));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});