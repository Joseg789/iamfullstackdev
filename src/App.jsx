import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home.jsx";
import ItemDetailPage from "./ItemDetailPage.jsx";

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Inicio</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<ItemDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
