import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home.jsx";
import ItemDetailPage from "./ItemDetailPage.jsx";
import InputCreate from "./InputCreate.jsx";

const App = () => {
  return (
    <Router>
      <nav style={styles.nav}>
        <Link to="/" style={styles.navLink}>
          Inicio
        </Link>
        <Link to="/create" style={styles.navButton}>
          + Nueva tarea
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<InputCreate />} />
        <Route path="/:id" element={<ItemDetailPage />} />
      </Routes>
    </Router>
  );
};

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    borderBottom: "0.5px solid #e0e0e0",
    fontFamily: "sans-serif",
  },
  navLink: {
    textDecoration: "none",
    fontSize: "14px",
    color: "#888",
  },
  navButton: {
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    color: "#0F6E56",
    background: "#E1F5EE",
    padding: "6px 14px",
    borderRadius: "8px",
  },
};

export default App;
