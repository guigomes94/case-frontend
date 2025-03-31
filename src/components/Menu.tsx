import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Meu App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/areas">Áreas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/processos">Processos</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
