import { api } from "./axios";
import { coingeekoApi } from "./axios";

export const TokenService = {
  async getTokens(address: string, chainId: string) {
    console.log("get tokens", chainId);
    return await api.get(`/api/balance/${chainId}/${address}`);
  },
  async getExchangeRate(chainId: string) {
    console.log("get exchange rate", chainId);
    return await api.get(`/api/balance/rate/${chainId}`);
  },
  async getEthUsdRate(chainName: string) {
    console.log("get eth usd rate", chainName);
    return await coingeekoApi.get(
      `/api/v3/simple/price?ids=${
        chainName === "polygon" ? "matic-network" : "ethereum"
      }&vs_currencies=usd`
    );
  },
};
