import axios from "axios"
import { IToken } from "../models/models"
import { API_URl } from "./axios"

// axios.defaults.baseURL = API_URl
export const TokenService = {

    async getTokens(address: string, chain: string) {
        console.log('get tokens', chain)
        return await axios.get(`${API_URl}/api/balance/${chain}/${address}`)
    },
    async getExchangeRate(chain: string) {
        console.log('get exchange rate', chain)
        return await axios.get(`${API_URl}/api/balance/${chain}/rate`) 
    },
    async getEthUsdRate(chain: string) {
        console.log('get eth usd rate', chain)
        return await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${chain === 'polygon' ? 'matic-network' : 'ethereum'}&vs_currencies=usd`)
    }
}