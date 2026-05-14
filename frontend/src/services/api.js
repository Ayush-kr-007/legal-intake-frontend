import axios from "axios";

const API = axios.create({
  baseURL:
    "https://legal-intake-backend-1.onrender.com",
});

export default API;