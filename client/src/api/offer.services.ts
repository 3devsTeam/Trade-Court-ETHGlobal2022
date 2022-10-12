import { api } from "./axios";

export const OfferService = {
  async create(data: any) {
    return api.post(`/api/offer`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
  },
  async joinByID(id: string, data: any) {
    return api.post(`/api/offer/${id}`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
  },
  async getUserOffers() {
    return api.get(`/api/user/me`, { withCredentials: true });
  },
  async getByID(id: string) {
    return api.get(`/api/offer/${id}`, { withCredentials: true });
  },
  async deleteByID(id: string) {
    return api.delete(`/api/offer/${id}`, {
      withCredentials: true,
    });
  },
  async claimByID(id: string) {
    return api.get(`/api/offer/${id}/claim`, {
      withCredentials: true,
    });
  },
  async getAll(page: number, limit = 5, keys: any) {
    if (keys.crypto) {
      console.log("request for crypto");
    }
    const { data } = await api.get(`/api/offer/?page=${page}&limit=${limit}`);
    return data.data.offers;
  },
};
