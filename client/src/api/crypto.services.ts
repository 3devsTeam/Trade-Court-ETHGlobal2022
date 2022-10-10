import { api } from "./axios";

export const CryptoServices = {
  async getByChain(chain: string) {
    const { data } = await api.get(`/api/balance/${chain}/list`);
    return data;
  },
};
