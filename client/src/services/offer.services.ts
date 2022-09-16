import axios from "axios"
import { API_URl } from "./tokens.services"
import { IOffer } from "../models/models"

export const OfferService = {

    async create(data: IOffer) {
        return axios.post(`${API_URl}/api/offer`, data, {
            headers: {'Content-Type': 'application/json'}
        })
    }, 
    async getFiat() {
        return axios.get(`${API_URl}/api/fiat`)
    }
}