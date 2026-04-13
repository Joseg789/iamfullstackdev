import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const URL_API =
  "https://ejercico-db-mongoose-swagger-render-cdgx.onrender.com/tasks";

const ItemDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${URL_API}/id/${id}`);
        if (!response.ok) throw new Error("Tarea no encontrada");
        const data = await response.json();
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleMarkAsCompleted = async () => {
    setUpdating(true);
    try {
      const response = await fetch(`${URL_API}/markAsCompleted/${id}`, {
        method: "PUT",
      });
      if (!response.ok) throw new Error("Error al actualizar la tarea");
      const data = await response.json();
      setItem(data.task);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p style={styles.status}>Cargando...</p>;
  if (error)
    return <p style={{ ...styles.status, color: "#993C1D" }}>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.back}>
        ← Volver
      </button>

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <span style={item.completed ? styles.badgeDone : styles.badgePending}>
            {item.completed ? "Completada" : "Pendiente"}
          </span>
        </div>

        <h1 style={styles.title}>{item.title}</h1>

        {!item.completed && (
          <button
            onClick={handleMarkAsCompleted}
            disabled={updating}
            style={updating ? styles.buttonDisabled : styles.button}
          >
            {updating ? "Guardando..." : "Marcar como completada"}
          </button>
        )}

        <div style={styles.divider} />

        <div style={styles.meta}>
          <div style={styles.metaRow}>
            <span style={styles.metaLabel}>Creada</span>
            <span style={styles.metaValue}>
              {new Date(item.createdAt).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div style={styles.metaRow}>
            <span style={styles.metaLabel}>Actualizada</span>
            <span style={styles.metaValue}>
              {new Date(item.updatedAt).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div style={styles.metaRow}>
            <span style={styles.metaLabel}>ID</span>
            <span
              style={{
                ...styles.metaValue,
                fontFamily: "monospace",
                fontSize: "12px",
              }}
            >
              {item._id}
            </span>
          </div>
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
  back: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    color: "#888",
    padding: "0",
    marginBottom: "1.5rem",
    display: "block",
  },
  card: {
    background: "#fff",
    border: "0.5px solid #e0e0e0",
    borderRadius: "12px",
    padding: "1.5rem",
  },
  cardHeader: {
    marginBottom: "12px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "500",
    color: "#111",
    margin: "0 0 1.25rem",
    lineHeight: "1.4",
  },
  button: {
    background: "#1D9E75",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 18px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    marginBottom: "1.25rem",
    display: "block",
    width: "100%",
  },
  buttonDisabled: {
    background: "#ccc",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 18px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "not-allowed",
    marginBottom: "1.25rem",
    display: "block",
    width: "100%",
  },
  divider: {
    height: "0.5px",
    background: "#e0e0e0",
    marginBottom: "1.25rem",
  },
  meta: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  metaRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaLabel: {
    fontSize: "13px",
    color: "#888",
  },
  metaValue: {
    fontSize: "13px",
    color: "#111",
  },
  badgePending: {
    fontSize: "11px",
    fontWeight: "500",
    background: "#FAECE7",
    color: "#993C1D",
    padding: "3px 10px",
    borderRadius: "20px",
    display: "inline-block",
  },
  badgeDone: {
    fontSize: "11px",
    fontWeight: "500",
    background: "#E1F5EE",
    color: "#0F6E56",
    padding: "3px 10px",
    borderRadius: "20px",
    display: "inline-block",
  },
  status: {
    textAlign: "center",
    marginTop: "3rem",
    color: "#888",
    fontFamily: "sans-serif",
  },
};

export default ItemDetailPage;
