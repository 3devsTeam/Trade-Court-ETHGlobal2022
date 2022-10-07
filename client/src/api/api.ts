import axios from "axios"
import { API_URl } from "./axios"

export const API = {
    async getBanks() {
        return axios.get(`${API_URl}/api/bank`)
    }
}