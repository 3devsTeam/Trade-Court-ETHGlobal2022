import axios from "axios";

export const API_URl = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URl,
});

export const coingeekoApi = axios.create({
  baseURL: "https://api.coingecko.com",
});
