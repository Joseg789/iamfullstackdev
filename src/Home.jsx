import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const URL_API =
  "https://ejercico-db-mongoose-swagger-render-cdgx.onrender.com/tasks";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL_API);
        if (!response.ok) throw new Error("Error al obtener las tareas");
        const resData = await response.json();
        setData(resData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p style={styles.status}>Cargando...</p>;
  if (error)
    return <p style={{ ...styles.status, color: "#993C1D" }}>Error: {error}</p>;

  const completed = data.filter((t) => t.completed).length;
  const pending = data.length - completed;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.title}>Mis tareas</span>
        <span style={styles.subtitle}>
          {pending} pendientes · {completed} completadas
        </span>
      </div>

      <div style={styles.list}>
        {data.map((task) => (
          <Link key={task._id} to={`/${task._id}`} style={styles.link}>
            <div style={styles.card}>
              <div
                style={task.completed ? styles.checkDone : styles.checkEmpty}
              >
                {task.completed && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4l2.5 2.5L9 1"
                      stroke="#0F6E56"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span
                style={task.completed ? styles.taskTitleDone : styles.taskTitle}
              >
                {task.title}
              </span>
              <span
                style={task.completed ? styles.badgeDone : styles.badgePending}
              >
                {task.completed ? "Completada" : "Pendiente"}
              </span>
            </div>
          </Link>
        ))}
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
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
  },
  title: {
    fontSize: "18px",
    fontWeight: "500",
    color: "#111",
  },
  subtitle: {
    fontSize: "13px",
    color: "#888",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  link: {
    textDecoration: "none",
  },
  card: {
    background: "#fff",
    border: "0.5px solid #e0e0e0",
    borderRadius: "12px",
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    transition: "border-color 0.15s",
  },
  checkEmpty: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "1.5px solid #ccc",
    flexShrink: 0,
  },
  checkDone: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "1.5px solid #1D9E75",
    background: "#E1F5EE",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  taskTitle: {
    fontSize: "15px",
    color: "#111",
    flex: 1,
  },
  taskTitleDone: {
    fontSize: "15px",
    color: "#888",
    flex: 1,
    textDecoration: "line-through",
  },
  badgePending: {
    fontSize: "11px",
    fontWeight: "500",
    background: "#FAECE7",
    color: "#993C1D",
    padding: "2px 8px",
    borderRadius: "20px",
  },
  badgeDone: {
    fontSize: "11px",
    fontWeight: "500",
    background: "#E1F5EE",
    color: "#0F6E56",
    padding: "2px 8px",
    borderRadius: "20px",
  },
  status: {
    textAlign: "center",
    marginTop: "3rem",
    color: "#888",
    fontFamily: "sans-serif",
  },
};

export default Home;
