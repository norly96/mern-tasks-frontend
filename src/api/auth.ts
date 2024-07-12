import axios from "axios";
import { User } from "../types/type";

const API = import.meta.env.VITE_API;

export const registerRequest = async (user: User) =>
  axios.post(`${API}/api/register`, user);
