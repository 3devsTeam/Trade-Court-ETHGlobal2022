import axios from "axios"
import { API_URl } from "./axios"
import { IOffer } from "../models/models"

export const OfferService = {

    async create(data: any) {
        return axios.post(`${API_URl}/api/offer`, data, {
            withCredentials: true,
            headers: {'Content-Type': 'application/json'}
        })
    }, 
    async getFiat() {
        return axios.get(`${API_URl}/api/fiat`)
    },
    async getAll() {
        return axios.get(`${API_URl}/api/offer`)
    }
}