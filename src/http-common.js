import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.0.108:5000/api/templates",
  headers: {
    "Content-type": "application/json",
  },
});
