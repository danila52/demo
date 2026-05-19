import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Booking() {
  const [form, setForm] = useState({
    hall_name: '',
    booking_date: '',
    payment_method: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // оставляем только цифры

    if (value.length > 2) value = value.slice(0, 2) + '.' + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + '.' + value.slice(5);
    if (value.length > 10) value = value.slice(0, 10);

    setForm({ ...form, booking_date: value });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Сначала войдите в аккаунт!');
      navigate('/login');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/bookings', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Заявка успешно отправлена!');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setMessage('Ошибка: ' + (err.response?.data?.message || 'Не удалось отправить заявку'));
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card bg-dark text-white">
            <div className="card-header bg-danger text-center">
              <h4>Оформление заявки на банкет</h4>
            </div>
            <div className="card-body">
              {message && <div className={`alert ${message.includes('успешно') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Выберите помещение</label>
                  <select name="hall_name" className="form-select bg-secondary text-white" onChange={handleChange} required>
                    <option value="">— Выберите —</option>
                    <option value="Большой банкетный зал">Большой банкетный зал</option>
                    <option value="Ресторан Панорама">Ресторан Панорама</option>
                    <option value="Закрытая веранда">Закрытая веранда</option>
                    <option value="Летняя терраса">Летняя терраса</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Дата начала банкета (ДД.ММ.ГГГГ)</label>
                  <input 
                    type="text" 
                    name="booking_date" 
                    className="form-control bg-secondary text-white" 
                    placeholder="25.05.2026" 
                    maxLength="10"
                    value={form.booking_date}
                    onChange={handleDateChange}
                    required 
                  />
                  <small className="text-muted">Автоматически ставятся точки. Пример: 25.05.2026</small>
                </div>

                <div className="mb-3">
                  <label className="form-label">Способ оплаты</label>
                  <select name="payment_method" className="form-select bg-secondary text-white" onChange={handleChange} required>
                    <option value="">— Выберите —</option>
                    <option value="Наличные">Наличные</option>
                    <option value="Карта">Банковская карта</option>
                    <option value="Перевод">Перевод на карту</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-danger w-100">Отправить заявку</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;