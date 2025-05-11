import { useEffect, useState } from "react";

const Navbar = ({ setCategory, setModalOpen }) => {
  const [theme, setTheme] = useState("light");
  const [username, setUsername] = useState(null);

  // Theme toggle logic
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-bs-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Logout logic
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("user");
    setUsername(null);
    window.location.reload();
  };

  // Load username on mount
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        theme === "dark" ? "bg-dark" : "bg-light"
      }`}
      data-bs-theme={theme}
    >
      <div className="container-fluid">
        <a
          className={`navbar-brand ${
            theme === "dark" ? "text-light" : "text-dark"
          }`}
          href="#"
        >
          <span className="badge bg-light text-dark fs-4">News Aggregator</span>
        </a>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="nav-link" onClick={() => setCategory("technology")}>Technology</div>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={() => setCategory("business")}>Business</div>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={() => setCategory("health")}>Health</div>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={() => setCategory("sports")}>Sports</div>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={() => setCategory("entertainment")}>Entertainment</div>
            </li>
          </ul>

          {/* 👤 User Info or Login Button */}
          {username ? (
            <div className="dropdown ms-auto">
              <button
                className="btn btn-success dropdown-toggle rounded-pill px-3"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                👋 {username}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <button
              className="btn btn-danger btn-sm ms-auto d-flex align-items-center rounded-pill px-2 py-0"
              onClick={() => setModalOpen(true)}
              style={{ gap: "8px" }}
            >
              <i className="bi bi-person-circle fs-5"></i>
              <span>Login/SignUp</span>
            </button>
          )}

          {/* 🌙 Theme Toggle */}
          <button
            className="btn btn-outline-secondary ms-2"
            onClick={toggleTheme}
            aria-label="Toggle Dark/Light Mode"
          >
            {theme === "dark" ? (
              <i className="bi bi-sun-fill"></i>
            ) : (
              <i className="bi bi-moon-fill"></i>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
