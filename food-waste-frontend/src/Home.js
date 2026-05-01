import React from "react";
import { Link, useNavigate } from "react-router-dom";
import donationImg from "./assets/food-donation.png";
const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* 🔹 HEADER */}
      <header style={styles.header}>
        <h2 style={styles.logo}>🍽 FoodShare</h2>

        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/services" style={styles.link}>Services</Link>
          <Link to="/contact" style={styles.link}>Contact</Link>
        </nav>

        <div>
          <Link to="/login">
            <button style={styles.loginBtn}>Login</button>
          </Link>

          <Link to="/signup">
            <button style={styles.signupBtn}>Sign Up</button>
          </Link>
        </div>
      </header>

      {/* 🔹 HERO SECTION */}
      <div style={styles.hero}>
        {/* LEFT */}
        <div style={styles.text}>
          <h1 style={styles.title}>
            Share Food, <br /> Save Lives ❤️
          </h1>

          <p style={styles.subtitle}>
            Help reduce food waste and support people in need.
            Join our community and make a real impact.
          </p>

          <button
            style={styles.cta}
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
        </div>

        {/* ✅ FIXED IMAGE SECTION */}
        <div style={styles.imageWrapper}>
          <div style={styles.imageOverlay}>
            <img
  src={donationImg}
  alt="food donation"
  style={styles.image}
/>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#0f172a",
    color: "white",
    minHeight: "100vh",
    padding: "20px 60px",
    fontFamily: "Arial",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
  },

  logo: {
    fontWeight: "bold",
  },

  nav: {
    display: "flex",
    gap: "30px",
  },

  link: {
    color: "#cbd5f5",
    textDecoration: "none",
    fontSize: "15px",
  },

  loginBtn: {
    marginRight: "10px",
    padding: "8px 15px",
    border: "none",
    background: "transparent",
    color: "white",
    cursor: "pointer",
  },

  signupBtn: {
    padding: "8px 15px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "white",
    color: "black",
    cursor: "pointer",
  },

  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "40px",
  },

  text: {
    maxWidth: "50%",
  },

  title: {
    fontSize: "48px",
    fontWeight: "bold",
    lineHeight: "1.2",
  },

  subtitle: {
    marginTop: "20px",
    fontSize: "18px",
    color: "#94a3b8",
  },

  cta: {
    marginTop: "25px",
    padding: "12px 24px",
    backgroundColor: "#ec4899",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  /* ✅ UPDATED IMAGE STYLES */
  imageWrapper: {
    width: "45%",
    display: "flex",
    justifyContent: "center",
  },

  imageOverlay: {
    position: "relative",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
  },

  image: {
    width: "100%",
    filter: "brightness(0.7)", // 🔥 blends with dark background
    transform: "scale(1.05)", // slight zoom effect
  },
};

export default Home;