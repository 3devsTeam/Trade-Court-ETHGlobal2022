import { api } from "./axios";

export const CryptoServices = {
  async getByChain(chainId: string) {
    const { data } = await api.get(`/api/balance/list/${chainId}`);
    return data;
  },
};
