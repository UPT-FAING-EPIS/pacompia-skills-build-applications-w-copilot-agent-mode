import { Link, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Home() {
  return (
    <div className="hero card border-0 shadow-lg overflow-hidden mb-4">
      <div className="card-body p-4 p-lg-5">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <p className="section-kicker text-uppercase mb-2">OctoFit Tracker</p>
            <h1 className="display-4 fw-bold lh-1 mb-3">Track training with a clean Bootstrap interface.</h1>
            <p className="lead text-secondary mb-4">
              Explore activities, teams, users, workouts, and the leaderboard from the Django REST API.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <Link className="btn btn-primary btn-lg" to="/activities">
                View activities
              </Link>
              <Link className="btn btn-outline-dark btn-lg" to="/leaderboard">
                Open leaderboard
              </Link>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="row g-3">
              <div className="col-6">
                <div className="metric-card card border-0 h-100">
                  <div className="card-body">
                    <span className="text-uppercase small text-secondary">Navigation</span>
                    <h2 className="h3 fw-bold mb-0">5 views</h2>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="metric-card card border-0 h-100">
                  <div className="card-body">
                    <span className="text-uppercase small text-secondary">API</span>
                    <h2 className="h3 fw-bold mb-0">REST</h2>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="metric-card card border-0 h-100">
                  <div className="card-body">
                    <span className="text-uppercase small text-secondary">Endpoint base</span>
                    <div className="fw-semibold text-break">https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const navigationItems = [
  { to: '/', label: 'Home' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
];

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border rounded-4 px-3 py-3 shadow-sm app-navbar mb-4">
      <Link className="navbar-brand fw-bold brand-mark" to="/">
        OctoFit Tracker
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#octofitNav"
        aria-controls="octofitNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="octofitNav">
        <div className="navbar-nav ms-auto gap-2 flex-wrap mt-3 mt-lg-0">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            className={({ isActive }) =>
              `nav-link nav-pill ${isActive ? 'active fw-semibold' : ''}`
            }
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
        </div>
      </div>
    </nav>
  );
}

function Overview() {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h2 className="h4 fw-semibold mb-3">REST API views</h2>
        <p className="text-secondary mb-0">
          Use the navigation to load data from the Django REST API endpoints.
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app-shell">
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="*" element={<Overview />} />
      </Routes>
    </div>
  );
}

export default App;