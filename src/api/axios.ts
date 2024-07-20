import axios from "axios";

const API = import.meta.env.VITE_API;

const token = localStorage.getItem("token");

const clientAxios = axios.create({
  baseURL: API,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  withCredentials: false,
});

export default clientAxios;
