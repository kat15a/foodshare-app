import axios from "axios";

const API = "http://localhost:8080/api";

export const getDonations = () => axios.get(`${API}/donations`);