import axios from "axios"
import { API_URl } from "./axios"

export const CryptoServices = {
    async getByChain(chain: string) {
        const { data } = await axios.get(`${API_URl}/api/balance/${chain}/list`)
        return data
    },

}