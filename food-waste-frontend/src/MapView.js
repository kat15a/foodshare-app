import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// 🎯 Custom icons
const greenIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [32, 32],
});

const redIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
});

const blueIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [32, 32],
});

const MapView = ({ user, donations }) => {
  if (!user?.latitude) return <p>Getting location...</p>;

  return (
    <MapContainer
      center={[user.latitude, user.longitude]}
      zoom={13}
      style={{ height: "400px", width: "100%", marginTop: "20px" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 🧍 User location */}
      <Marker position={[user.latitude, user.longitude]} icon={blueIcon}>
        <Popup>📍 You are here</Popup>
      </Marker>

      {/* 🍛 Donations with SAFE CHECK */}
      {donations.map((d) =>
        d.latitude && d.longitude ? (
          <Marker
            key={d.donationId}
            position={[d.latitude, d.longitude]}
            icon={d.status === "AVAILABLE" ? greenIcon : redIcon}
          >
            <Popup>
              <b>{d.foodName}</b> <br />
              Quantity: {d.quantity} <br />
              Status: {d.status}
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
};

export default MapView;