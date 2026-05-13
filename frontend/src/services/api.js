import axios from "axios";

const API = axios.create({
  baseURL:
    "https://legal-intake-backend.onrender.com/api",
});

export default API;