import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadAllBookings();
  }, []);

  const loadAllBookings = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/bookings/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      alert('Ошибка загрузки или нет прав администратора');
    }
  };

  const updateStatus = async (id, newStatus) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Статус обновлён');
      loadAllBookings(); // обновляем список
    } catch (err) {
      alert('Ошибка обновления статуса');
    }
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Панель администратора</h2>
      
      <div className="mb-3">
        <button className="btn btn-outline-light me-2" onClick={() => setFilter('all')}>Все заявки</button>
        <button className="btn btn-outline-warning me-2" onClick={() => setFilter('Новая')}>Новые</button>
        <button className="btn btn-outline-info me-2" onClick={() => setFilter('Банкет назначен')}>Назначенные</button>
        <button className="btn btn-outline-success" onClick={() => setFilter('Банкет завершен')}>Завершенные</button>
      </div>

      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>ФИО</th>
            <th>Зал</th>
            <th>Дата</th>
            <th>Оплата</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map(b => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.fio}</td>
              <td>{b.hall_name}</td>
              <td>{b.booking_date}</td>
              <td>{b.payment_method}</td>
              <td>
                <span className={`badge ${b.status === 'Новая' ? 'bg-warning' : b.status === 'Банкет назначен' ? 'bg-info' : 'bg-success'}`}>
                  {b.status}
                </span>
              </td>
              <td>
                <select 
                  className="form-select form-select-sm bg-secondary text-white" 
                  onChange={(e) => updateStatus(b.id, e.target.value)}
                  value={b.status}
                >
                  <option value="Новая">Новая</option>
                  <option value="Банкет назначен">Банкет назначен</option>
                  <option value="Банкет завершен">Банкет завершен</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredBookings.length === 0 && <p className="text-center">Заявок нет</p>}
    </div>
  );
}

export default AdminPanel;