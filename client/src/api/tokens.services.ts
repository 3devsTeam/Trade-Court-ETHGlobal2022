import { api } from "./axios";
import { coingeekoApi } from "./axios";

export const TokenService = {
  async getTokens(address: string, chain: string) {
    console.log("get tokens", chain);
    return await api.get(`/api/balance/${chain}/${address}`);
  },
  async getExchangeRate(chain: string) {
    console.log("get exchange rate", chain);
    return await api.get(`/api/balance/${chain}/rate`);
  },
  async getEthUsdRate(chain: string) {
    console.log("get eth usd rate", chain);
    return await coingeekoApi.get(
      `/api/v3/simple/price?ids=${
        chain === "polygon" ? "matic-network" : "ethereum"
      }&vs_currencies=usd`
    );
  },
};
