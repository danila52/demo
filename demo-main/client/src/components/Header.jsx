import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
    // Обновляем при возвращении на вкладку
    window.addEventListener('focus', checkAuth);
    return () => window.removeEventListener('focus', checkAuth);
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#4c1d16' }}>
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/">🍾 Банкетам.Нет</Link>

        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/">Главная</Link>
          <Link className="nav-link" to="/booking">Забронировать</Link>

          {user ? (
            <>
              <Link className="nav-link" to="/dashboard">Личный кабинет</Link>
              {user.role === 'admin' && <Link className="nav-link text-warning fw-bold" to="/admin">👑 Админ</Link>}
              <button className="btn btn-outline-light ms-3" onClick={logout}>Выйти</button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">Войти</Link>
              <Link className="nav-link" to="/register">Регистрация</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;