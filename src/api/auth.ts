import axios from "./axios.ts";
import { User } from "../types/type";

export const registerRequest = async (user: User) =>
  axios.post(`/api/register`, user);

export const loginRequest = async (user: User) =>
  axios.post(`/api/login`, user);

export const verifyToken = async () => {
  try {
    const response = await axios.get("/api/verify-token");
    return response.data;
  } catch (error) {
    throw new Error("Token verification failed");
  }
};
