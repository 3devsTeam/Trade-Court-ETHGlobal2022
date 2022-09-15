import axios from "axios"
import { IToken } from "../models/models"

export const API_URl = import.meta.env.VITE_API_URL

// axios.defaults.baseURL = API_URl
export const TokenService = {
    async getTokens(address: string) {
        return await axios.get(`${API_URl}/api/balance/ERC20/${address}`)
     
    },
    async getExchangeRateERC20() {
        return await axios.get(`${API_URl}/api/balance/rate/erc20`) 
    },
    async getEthUsdRate() {
        return await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`)
    }
}