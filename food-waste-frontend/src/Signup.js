import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("DONOR");

  const navigate = useNavigate();

  const handleSignup = () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, role }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Signup successful!");
        navigate("/login");
      })
      .catch(() => alert("Signup failed"));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account 🚀</h2>
        <p style={styles.subtitle}>Join FoodShare today</p>

        <div style={styles.inputBox}>
          <span>👤</span>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.inputBox}>
          <span>📧</span>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.inputBox}>
          <span>🔒</span>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.selectBox}>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.select}
          >
            <option value="" disabled>Select Role</option>
            <option value="DONOR">Donor</option>
            <option value="RECEIVER">Receiver</option>
          </select>
        </div>

        <button style={styles.button} onClick={handleSignup}>
          Sign Up
        </button>

        <p style={styles.footer}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} style={styles.link}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
  },

  card: {
    background: "#1e293b",
    padding: "40px",
    borderRadius: "16px",
    width: "340px",
    textAlign: "center",
    boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
  },

  title: {
    color: "white",
    marginBottom: "5px",
  },

  subtitle: {
    color: "#94a3b8",
    marginBottom: "25px",
    fontSize: "14px",
  },

  inputBox: {
    display: "flex",
    alignItems: "center",
    background: "#0f172a",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "15px",
    border: "1px solid #334155",
  },

  input: {
    border: "none",
    outline: "none",
    background: "transparent",
    color: "white",
    marginLeft: "10px",
    width: "100%",
  },

  selectBox: {
    marginBottom: "15px",
  },

  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#0f172a",
    color: "white",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#ec4899",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },

  footer: {
    marginTop: "15px",
    color: "#94a3b8",
    fontSize: "14px",
  },

  link: {
    color: "#ec4899",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Signup;