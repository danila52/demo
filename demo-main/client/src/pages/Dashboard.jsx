import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await axios.get('http://localhost:5000/api/bookings/my', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const submitReview = async (bookingId) => {
    if (!reviewText.trim()) {
      alert('Напишите текст отзыва');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/bookings/review', 
        { booking_id: bookingId, text: reviewText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert('Отзыв успешно отправлен!');
      setReviewText('');
      setSelectedBookingId(null);
      loadBookings(); // обновляем список
    } catch (err) {
      alert('Ошибка отправки отзыва');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Личный кабинет</h2>
      <h4 className="mb-4">Мои заявки</h4>

      {bookings.length === 0 ? (
        <p className="text-light">У вас пока нет заявок</p>
      ) : (
        bookings.map(b => (
          <div key={b.id} className="card bg-dark border border-danger mb-4">
            <div className="card-body text-light">
              <h5 className="text-warning">{b.hall_name}</h5>
              <p><strong>Дата:</strong> {b.booking_date}</p>
              <p><strong>Оплата:</strong> {b.payment_method}</p>
              <p>
                <strong>Статус:</strong>{' '}
                <span className={`badge ${b.status === 'Новая' ? 'bg-warning' : b.status === 'Банкет назначен' ? 'bg-info' : 'bg-success'}`}>
                  {b.status}
                </span>
              </p>

              {/* Форма отзыва */}
              {b.status === 'Банкет завершен' && (
                <div className="mt-3">
                  <textarea 
                    className="form-control bg-secondary text-white" 
                    rows="3"
                    placeholder="Напишите ваш отзыв о проведённом банкете..."
                    value={selectedBookingId === b.id ? reviewText : ''}
                    onChange={(e) => {
                      setSelectedBookingId(b.id);
                      setReviewText(e.target.value);
                    }}
                  />
                  <button 
                    className="btn btn-outline-warning mt-2"
                    onClick={() => submitReview(b.id)}
                  >
                    Отправить отзыв
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}

      <a href="/booking" className="btn btn-danger mt-3">Создать новую заявку</a>
    </div>
  );
}

export default Dashboard;
