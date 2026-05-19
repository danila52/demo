import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [form, setForm] = useState({ login: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      alert('Вход выполнен успешно!');
      
      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Неверный логин или пароль');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card bg-dark text-white">
            <div className="card-header text-center bg-danger">
              <h4>Вход в Банкетам.Нет</h4>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Логин</label>
                  <input 
                    type="text" 
                    name="login" 
                    className="form-control bg-secondary text-white" 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label>Пароль</label>
                  <input 
                    type="password" 
                    name="password" 
                    className="form-control bg-secondary text-white" 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <button type="submit" className="btn btn-danger w-100 mb-3">Войти</button>
              </form>

              <p className="text-center">
                Нет аккаунта? <a href="/register" className="text-warning">Зарегистрироваться</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;