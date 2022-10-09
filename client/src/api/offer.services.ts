import axios from "axios";
import { API_URl } from "./axios";
import { IOffer } from "../models/models";

export const OfferService = {
  async create(data: any) {
    return axios.post(`${API_URl}/api/offer`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
  },
  async joinByID(id: string, data: any) {
    return axios.post(`${API_URl}/api/offer/${id}`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
  },
  async getUserOffers() {
    return axios.get(`${API_URl}/api/user/me`, { withCredentials: true });
  },
  async getByID(id: string) {
    return axios.get(`${API_URl}/api/offer/${id}`, { withCredentials: true });
  },
  async deleteByID(id: string) {
    return axios.delete(`${API_URl}/api/offer/${id}`, {
      withCredentials: true,
    });
  },
  async claimByID(id: string) {
    return axios.get(`${API_URl}/api/offer/${id}/claim`, {
      withCredentials: true,
    });
  },
  async getAllWithPagination(page: number, limit = 5) {
    const { data } = await axios.get(
      `${API_URl}/api/offer/?page=${page}&limit=${limit}`
    );
    return data;
  },
};
