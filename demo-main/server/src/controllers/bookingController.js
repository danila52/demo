const db = require('../config/db');

// Создать заявку
const createBooking = (req, res) => {
  const { hall_name, booking_date, payment_method } = req.body;
  const user_id = req.user?.id;

  if (!user_id) {
    return res.status(401).json({ message: 'Не авторизован' });
  }

  if (!hall_name || !booking_date || !payment_method) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }

  db.run(`INSERT INTO bookings (user_id, hall_name, booking_date, payment_method) 
          VALUES (?, ?, ?, ?)`,
    [user_id, hall_name, booking_date, payment_method],
    function(err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Ошибка при создании заявки' });
      }
      res.json({ 
        message: 'Заявка успешно создана!', 
        booking_id: this.lastID 
      });
    }
  );
};

// Мои заявки
const getUserBookings = (req, res) => {
  const user_id = req.user.id;
  db.all(`SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC`, [user_id], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Ошибка сервера' });
    res.json(rows);
  });
};

// Все заявки (админ)
const getAllBookings = (req, res) => {
  db.all(`SELECT b.*, u.fio, u.phone, u.email 
          FROM bookings b 
          JOIN users u ON b.user_id = u.id 
          ORDER BY b.created_at DESC`, (err, rows) => {
    if (err) return res.status(500).json({ message: 'Ошибка сервера' });
    res.json(rows);
  });
};

// Обновить статус
const updateBookingStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.run(`UPDATE bookings SET status = ? WHERE id = ?`, [status, id], function(err) {
    if (err) return res.status(500).json({ message: 'Ошибка обновления' });
    res.json({ message: 'Статус обновлён' });
  });
};

// Добавить отзыв
const addReview = (req, res) => {
  const { booking_id, text } = req.body;
  const user_id = req.user.id;

  db.run(`INSERT INTO reviews (booking_id, user_id, text) VALUES (?, ?, ?)`,
    [booking_id, user_id, text],
    function(err) {
      if (err) return res.status(500).json({ message: 'Ошибка при добавлении отзыва' });
      res.json({ message: 'Спасибо за отзыв!' });
    }
  );
};

module.exports = { 
  createBooking, 
  getUserBookings, 
  getAllBookings, 
  updateBookingStatus, 
  addReview 
};