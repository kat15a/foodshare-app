import React, { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = () => {
    if (!name || !email || !message) {
      setMsg("❌ Please fill all fields");
      setTimeout(() => setMsg(""), 3000);
      return;
    }

    // ✅ success message (no backend yet)
    setMsg("✅ Message sent successfully!");

    setName("");
    setEmail("");
    setMessage("");

    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div style={styles.container}>
      {/* ✅ Toast */}
      {msg && <div style={styles.toast}>{msg}</div>}

      <h1 style={styles.title}>📩 Contact Us</h1>

      <div style={styles.wrapper}>
        {/* LEFT CARD */}
        <div style={styles.card}>
          <h2>📞 Get in Touch</h2>
          <p>We’d love to hear from you!</p>

          <p>📧 foodshare@gmail.com</p>
          <p>📱 +91 9876543210</p>
          <p>📍 Greater Noida, India</p>
        </div>

        {/* RIGHT CARD (FORM) */}
        <div style={styles.card}>
          <input
            style={styles.input}
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            style={styles.textarea}
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button style={styles.button} onClick={handleSubmit}>
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

//////////////////////////////////////////////////////////

const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px 20px",
    background: "linear-gradient(135deg, #020617, #0f172a)",
    color: "white",
    textAlign: "center",
  },

  title: {
    fontSize: "32px",
    marginBottom: "30px",
  },

  wrapper: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
  },

  card: {
    width: "350px",
    padding: "25px",
    borderRadius: "15px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
    textAlign: "left",
  },

  input: {
    width: "100%",
    height: "45px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "0 12px",
    background: "#020617",
    color: "white",
    outline: "none",

    // ✅ FIX autofill white issue
    WebkitBoxShadow: "0 0 0px 1000px #020617 inset",
    WebkitTextFillColor: "white",
  },

  textarea: {
    width: "100%",
    height: "100px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "10px",
    background: "#020617",
    color: "white",
    outline: "none",

    // ✅ autofill fix
    WebkitBoxShadow: "0 0 0px 1000px #020617 inset",
    WebkitTextFillColor: "white",
  },

  button: {
    width: "100%",
    height: "45px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #ec4899, #f43f5e)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  toast: {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#22c55e",
    padding: "12px 20px",
    borderRadius: "8px",
    color: "white",
    zIndex: 999,
  },
};

export default Contact;