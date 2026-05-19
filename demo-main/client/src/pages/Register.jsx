import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({ login: '', password: '', fio: '', phone: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      setSuccess(res.data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка регистрации');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-dark text-white">
            <div className="card-header text-center bg-danger">
              <h4>Регистрация — Банкетам.Нет</h4>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Логин (минимум 6 символов)</label>
                  <input type="text" name="login" className="form-control bg-secondary text-white" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label>Пароль (минимум 8 символов)</label>
                  <input type="password" name="password" className="form-control bg-secondary text-white" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label>ФИО</label>
                  <input type="text" name="fio" className="form-control bg-secondary text-white" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label>Телефон</label>
                  <input type="tel" name="phone" className="form-control bg-secondary text-white" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input type="email" name="email" className="form-control bg-secondary text-white" onChange={handleChange} required />
                </div>

                <button type="submit" className="btn btn-danger w-100">Зарегистрироваться</button>
              </form>

              <p className="text-center mt-3">
                Уже есть аккаунт? <a href="/login" className="text-warning">Войти</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;