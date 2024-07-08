import axios from "axios";

const API = import.meta.env.VITE_API;

export interface User {
  username: string;
  email: string;
  password: string;
}

export const registerRequest = (user: User) =>
  axios.post(`${API}/api/register`, user);
