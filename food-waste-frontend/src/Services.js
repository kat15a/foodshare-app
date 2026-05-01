import React from "react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Donate Food",
    description: "Share surplus food with people in need.",
    icon: "🍱",
    action: "Start Donating",
    link: "/login", // ✅ route added
  },
  {
    title: "Find Nearby Food",
    description: "Locate food donations near you using map.",
    icon: "📍",
    action: "Explore Map",
    link: "/login", // ✅ route added
  },
  {
    title: "Connect Community",
    description: "Bridge donors and receivers efficiently.",
    icon: "🤝",
    action: "Join Now",
    link: "/signup", // ✅ route added
  },
];

const Services = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Our Services</h1>

      <div style={styles.grid}>
        {services.map((service, index) => (
          <div key={index} style={styles.card} className="service-card">
            <div style={styles.icon}>{service.icon}</div>

            <h2>{service.title}</h2>
            <p style={styles.desc}>{service.description}</p>

            {/* ✅ BUTTON WITH ROUTING */}
            <Link to={service.link}>
              <button style={styles.button}>
                {service.action}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
    padding: "50px",
    textAlign: "center",
  },

  heading: {
    fontSize: "36px",
    marginBottom: "40px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
  },

  card: {
    background: "#1e293b",
    padding: "25px",
    borderRadius: "12px",
    transition: "0.3s",
    cursor: "pointer",
  },

  icon: {
    fontSize: "40px",
    marginBottom: "15px",
  },

  desc: {
    color: "#cbd5e1",
    marginBottom: "15px",
  },

  button: {
    padding: "10px 15px",
    background: "#ec4899",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
    transition: "0.2s",
  },
};

export default Services;