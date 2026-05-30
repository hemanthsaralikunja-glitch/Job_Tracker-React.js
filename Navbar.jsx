import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">JobTracker</Link>
      </div>

      <div className="nav-center">
        <Link to="/" className="nav-link">All Jobs</Link>
        <Link to="/add" className="nav-link">Add Job</Link>
        <Link to="/kanban" className="nav-link">Kanban</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
      </div>

      <div className="nav-right">
        <Link to="/add" className="btn-primary">+ New</Link>
      </div>
    </nav>
  );
}
