import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// ✅ CHART IMPORTS
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// ✅ FIX marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function Receiver({ user }) {
  const [donations, setDonations] = useState([]);

  const chartData = {
    labels: ["Available", "Claimed"],
    datasets: [
      {
        label: "Donations",
        data: [
          donations.filter((d) => d.status === "AVAILABLE").length,
          donations.filter((d) => d.status === "CLAIMED").length,
        ],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderRadius: 6,
      },
    ],
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/donations")
      .then((res) => res.json())
      .then((data) => setDonations(data));
  }, []);

  const requestFood = (id) => {
    fetch(`http://localhost:8080/api/donations/${id}/claim`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((updated) => {
        setDonations((prev) =>
          prev.map((d) => (d.donationId === id ? updated : d))
        );
      })
      .catch(() => alert("❌ Failed to request food"));
  };

  const cancelRequest = (id) => {
    fetch(`http://localhost:8080/api/donations/${id}/cancel`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((updated) => {
        setDonations((prev) =>
          prev.map((d) => (d.donationId === id ? updated : d))
        );
      })
      .catch(() => alert("❌ Failed to cancel request"));
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>📦 Available Food</h1>

        <p style={styles.subtitle}>
          Welcome {user?.name} (Receiver)
        </p>

        {/* STATS */}
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <h3>{donations.length}</h3>
            <p>Total Donations</p>
          </div>

          <div style={styles.statCard}>
            <h3>
              {donations.filter((d) => d.status === "AVAILABLE").length}
            </h3>
            <p>Available</p>
          </div>

          <div style={styles.statCard}>
            <h3>
              {donations.filter((d) => d.status === "CLAIMED").length}
            </h3>
            <p>Claimed</p>
          </div>
        </div>

        {/* MAP + GRAPH */}
        <div style={styles.mapGraphWrapper}>
          <div style={styles.mapBox}>
            <MapContainer
              center={[
                user?.latitude || 28.6139,
                user?.longitude || 77.2090,
              ]}
              zoom={12}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {donations.map((d) => (
                <Marker
                  key={d.donationId}
                  position={[d.latitude, d.longitude]}
                >
                  <Popup>
                    <b>{d.foodName}</b><br />
                    Qty: {d.quantity}<br />
                    Status: {d.status}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div style={styles.graphBox}>
            <Bar data={chartData} />
          </div>
        </div>

        {/* CARDS */}
        <div style={styles.grid}>
          {donations.map((d) => (
            <div
              key={d.donationId}
              style={{
                ...styles.card,
                opacity: d.status === "CLAIMED" ? 0.7 : 1,
              }}
            >
              {/* CONTENT */}
              <div>
                {d.imageUrl && (
                  <img
                    src={`http://localhost:8080/uploads/${d.imageUrl}`}
                    alt="food"
                    style={styles.image}
                  />
                )}

                <h3 style={styles.foodName}>{d.foodName}</h3>

                <p style={styles.qty}>
                  Qty: {d.quantity} {d.unit}
                </p>

                <p style={styles.location}>📍 Nearby</p>

                <p
                  style={{
                    ...styles.status,
                    color:
                      d.status === "AVAILABLE" ? "#22c55e" : "#ef4444",
                  }}
                >
                  {d.status}
                </p>
              </div>

              {/* BUTTONS */}
              <div>
                {d.status === "AVAILABLE" && (
                  <button
                    style={styles.requestBtn}
                    onClick={() => requestFood(d.donationId)}
                  >
                    Request
                  </button>
                )}

                {d.status === "CLAIMED" && (
                  <>
                    <p style={styles.claimed}>Claimed</p>
                    <button
                      style={styles.cancelBtn}
                      onClick={() => cancelRequest(d.donationId)}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
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
    padding: "30px",
    width: "100%",
    minHeight: "100vh",
    boxSizing: "border-box",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  content: {
    width: "100%",
    maxWidth: "1200px",
  },

  title: {
    textAlign: "center",
    fontSize: "28px",
  },

  subtitle: {
    textAlign: "center",
    color: "#94a3b8",
    marginBottom: "20px",
  },

  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginBottom: "25px",
  },

  statCard: {
    padding: "20px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.05)",
    textAlign: "center",
  },

  mapGraphWrapper: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
    marginBottom: "30px",
  },

  mapBox: {
    height: "300px",
    borderRadius: "14px",
    overflow: "hidden",
  },

  graphBox: {
    height: "300px",
    background: "rgba(255,255,255,0.05)",
    padding: "15px",
    borderRadius: "14px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "16px",
    width: "100%",
  },

  // ⭐ FIXED CARD ALIGNMENT
  card: {
    padding: "12px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  image: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "8px",
  },

  foodName: {
    fontSize: "16px",
  },

  qty: {
    fontSize: "13px",
  },

  location: {
    fontSize: "12px",
  },

  status: {
    marginTop: "6px",
    fontWeight: "600",
    fontSize: "13px",
  },

  requestBtn: {
    marginTop: "8px",
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    border: "none",
    background: "#ec4899",
    color: "white",
    cursor: "pointer",
  },

  cancelBtn: {
    marginTop: "8px",
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    border: "none",
    background: "#334155",
    color: "white",
    cursor: "pointer",
    fontSize: "13px",
  },

  claimed: {
    color: "#ef4444",
    fontSize: "13px",
  },
};

export default Receiver;