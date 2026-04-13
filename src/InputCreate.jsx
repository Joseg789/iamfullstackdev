import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URL_API =
  "https://ejercico-db-mongoose-swagger-render-cdgx.onrender.com/tasks";

const InputCreate = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${URL_API}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) throw new Error("Error al crear la tarea");

      setTitle("");
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Nueva tarea</h1>

      <div style={styles.card}>
        <label style={styles.label}>Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Escribe una tarea..."
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.actions}>
          <button onClick={() => navigate(-1)} style={styles.buttonSecondary}>
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !title.trim()}
            style={
              loading || !title.trim()
                ? styles.buttonDisabled
                : styles.buttonPrimary
            }
          >
            {loading ? "Guardando..." : "Crear tarea"}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "0 1rem",
    fontFamily: "sans-serif",
  },
  title: {
    fontSize: "22px",
    fontWeight: "500",
    color: "#111",
    marginBottom: "1.5rem",
  },
  card: {
    background: "#fff",
    border: "0.5px solid #e0e0e0",
    borderRadius: "12px",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    fontSize: "13px",
    color: "#888",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    fontSize: "15px",
    border: "0.5px solid #e0e0e0",
    borderRadius: "8px",
    outline: "none",
    boxSizing: "border-box",
    color: "#111",
    fontFamily: "sans-serif",
  },
  actions: {
    display: "flex",
    gap: "8px",
    justifyContent: "flex-end",
    marginTop: "4px",
  },
  buttonPrimary: {
    background: "#1D9E75",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  },
  buttonDisabled: {
    background: "#ccc",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "not-allowed",
  },
  buttonSecondary: {
    background: "none",
    color: "#888",
    border: "0.5px solid #e0e0e0",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "14px",
    cursor: "pointer",
  },
  error: {
    fontSize: "13px",
    color: "#993C1D",
    margin: 0,
  },
};

export default InputCreate;
