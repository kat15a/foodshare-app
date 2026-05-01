import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // ✅ Remove password
      const { password: _, ...safeUser } = data;

      // ✅ Save user
      localStorage.setItem("user", JSON.stringify(safeUser));
      setUser(safeUser);

      // ✅ Role-based navigation
      if (safeUser.role === "RECEIVER") {
        navigate("/receiver");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <p style={styles.subtitle}>Login to continue</p>

        <div style={styles.inputBox}>
          <span style={styles.icon}>📧</span>
          <input
            style={styles.input}
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={styles.inputBox}>
          <span style={styles.icon}>🔒</span>
          <input
            style={styles.input}
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        <p style={styles.footer}>
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")} style={styles.link}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

//////////////////////////////////////////////////////////

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "360px",
    padding: "30px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
    textAlign: "center",
    color: "white",
  },

  title: {
    marginBottom: "5px",
  },

  subtitle: {
    marginBottom: "20px",
    color: "#94a3b8",
  },

  inputBox: {
    display: "flex",
    alignItems: "center",
    background: "#0f172a",
    borderRadius: "10px",
    marginBottom: "15px",
    padding: "0 10px",
    border: "1px solid rgba(255,255,255,0.1)",
  },

  icon: {
    marginRight: "8px",
  },

  input: {
    flex: 1,
    height: "40px",
    border: "none",
    outline: "none",
    background: "transparent",
    color: "white",
  },

  button: {
    width: "100%",
    height: "45px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #ec4899, #f43f5e)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
  },

  footer: {
    marginTop: "15px",
    color: "#94a3b8",
  },

  link: {
    color: "#ec4899",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Login;