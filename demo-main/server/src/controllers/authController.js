const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'banquetam_net_secret_2026'; // можно потом в .env

// Регистрация
const register = (req, res) => {
  const { login, password, fio, phone, email } = req.body;

  if (!login || !password || !fio || !phone || !email) {
    return res.status(400).json({ message: 'Все поля обязательны' });
  }

  // Проверка длины
  if (login.length < 6) return res.status(400).json({ message: 'Логин минимум 6 символов' });
  if (password.length < 8) return res.status(400).json({ message: 'Пароль минимум 8 символов' });

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run(`INSERT INTO users (login, password, fio, phone, email) VALUES (?, ?, ?, ?, ?)`,
    [login, hashedPassword, fio, phone, email],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(400).json({ message: 'Логин уже занят' });
        }
        return res.status(500).json({ message: 'Ошибка сервера' });
      }
      res.json({ message: 'Регистрация успешна!' });
    }
  );
};

// Логин
const login = (req, res) => {
  const { login, password } = req.body;

  db.get(`SELECT * FROM users WHERE login = ?`, [login], (err, user) => {
    if (err || !user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Неверный логин или пароль' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ message: 'Вход выполнен', token, user: { id: user.id, fio: user.fio, role: user.role } });
  });
};

module.exports = { register, login };