import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import Home from "./Home";
import Services from "./Services";
import Contact from "./Contact";
import Signup from "./Signup";
import Receiver from "./Receiver";

function App() {
  const [donations, setDonations] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const [city, setCity] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [locationLoading, setLocationLoading] = useState(true);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // 📍 LOCATION
  useEffect(() => {
    if (!user) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const updatedUser = {
          ...user,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setLocationLoading(false);
      },
      () => {
        alert("Please allow location access");
        setLocationLoading(false);
      }
    );
  }, []);

  // 🌍 CITY
  useEffect(() => {
    if (user?.latitude && user?.longitude) {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${user.latitude}&lon=${user.longitude}`
      )
        .then((res) => res.json())
        .then((data) => {
          const cityName =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "Unknown";
          setCity(cityName);
        })
        .catch((err) => console.error("City fetch error:", err)); // ✅ FIX
    }
  }, [user]);

  // 📦 FETCH DONATIONS
  useEffect(() => {
    if (user) {
      fetch("http://localhost:8080/api/donations")
        .then((res) => {
          if (!res.ok) throw new Error("Server error");
          return res.json();
        })
        .then((data) => setDonations(data))
        .catch((err) => {
          console.error("Fetch donations error:", err); // ✅ FIX
        });
    }
  }, [user]);

  // ➕ ADD DONATION
  const addDonation = () => {
    if (!foodName || !quantity || !file || !unit) {
      alert("Please fill all fields");
      return;
    }

    if (!user?.latitude) {
      alert("📍 Getting location...");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("foodName", foodName);
    formData.append("quantity", quantity);
    formData.append("unit", unit);
    formData.append("userId", user.id);
    formData.append("lat", user.latitude);
    formData.append("lng", user.longitude);

    fetch("http://localhost:8080/api/donations", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Upload failed");
        return res.json();
      })
      .then((data) => {
        setDonations([...donations, data]);
        setSuccessMsg("✅ Donation added!");
        setTimeout(() => setSuccessMsg(""), 3000);

        setFoodName("");
        setQuantity("");
        setUnit("");
        setFile(null);
        setFileName("");
      })
      .catch((err) => {
        console.error("Add donation error:", err); // ✅ FIX
        alert("❌ Failed to add donation");
      });
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/dashboard"
        element={
          user?.role === "DONOR" ? (
            <Dashboard
              user={user}
              donations={donations}
              foodName={foodName}
              setFoodName={setFoodName}
              quantity={quantity}
              setQuantity={setQuantity}
              unit={unit}
              setUnit={setUnit}
              setFile={setFile}
              fileName={fileName}
              setFileName={setFileName}
              addDonation={addDonation}
              city={city}
              successMsg={successMsg}
              locationLoading={locationLoading}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/receiver"
        element={
          user?.role === "RECEIVER" ? (
            <Receiver user={user} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

//////////////////////////////////////////////////////////

function Dashboard({
  user,
  donations,
  foodName,
  setFoodName,
  quantity,
  setQuantity,
  unit,
  setUnit,
  setFile,
  fileName,
  setFileName,
  addDonation,
  city,
  successMsg,
  locationLoading,
}) {
  if (!user) return <Navigate to="/login" />;

  return (
    <div style={styles.container}>
      <div style={styles.content}>

        {successMsg && <div style={styles.toast}>{successMsg}</div>}

        <h1 style={styles.title}>🍽 Food Donations</h1>

        <div style={styles.formContainer}>
          <input
            style={styles.input}
            placeholder="Food Name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />

          <input
            style={styles.input}
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            style={{
              ...styles.input,
              color: unit ? "white" : "#94a3b8",
            }}
          >
            <option value="" disabled hidden>
              Select Unit
            </option>
            <option value="kg">Kg</option>
            <option value="liters">Liters</option>
            <option value="plates">Plates</option>
            <option value="packets">Packets</option>
          </select>

          <label style={styles.fileBox}>
            <input
              type="file"
              hidden
              onChange={(e) => {
                const f = e.target.files[0];
                setFile(f);
                if (f) setFileName(f.name);
              }}
            />
            {fileName || "Upload Image"}
          </label>

          <button
            style={{
              ...styles.button,
              opacity: locationLoading ? 0.6 : 1,
            }}
            onClick={addDonation}
            disabled={locationLoading}
          >
            {locationLoading ? "Getting Location..." : "Add Donation"}
          </button>
        </div>

        <div style={styles.grid}>
          {donations.map((d) => (
            <div key={d.donationId} style={styles.card}>
              {d.imageUrl && (
                <img
                  src={`http://localhost:8080/uploads/${d.imageUrl}`}
                  alt="food"
                  style={styles.image}
                />
              )}
              <h3>{d.foodName}</h3>
              <p>Qty: {d.quantity} {d.unit}</p>
              <p>📍 {city}</p>
              <p style={styles.status}>{d.status}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

//////////////////////////////////////////////////////////

const styles = {
  container: {
    padding: "30px 0",
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  content: {
    width: "100%",
    padding: "0 30px",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
  },
  formContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "16px",
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    padding: "16px",
    borderRadius: "14px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
    marginBottom: "30px",
  },
  input: {
    width: "100%",
    height: "42px",
    padding: "0 12px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "#0f172a",
    color: "white",
    outline: "none",
  },
  fileBox: {
    width: "100%",
    height: "42px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    cursor: "pointer",
    background: "#0f172a",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#cbd5f5",
  },
  button: {
    width: "100%",
    height: "42px",
    background: "linear-gradient(135deg, #ec4899, #f43f5e)",
    color: "white",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
    width: "100%",
  },
  card: {
    padding: "14px",
    background: "#1e293b",
    borderRadius: "10px",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
  },
  status: {
    color: "#22c55e",
  },
  toast: {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#22c55e",
    padding: "10px",
    borderRadius: "8px",
  },
};

export default App;