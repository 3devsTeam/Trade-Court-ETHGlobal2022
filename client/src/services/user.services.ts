import axios from "axios"

import { API_URl } from "./tokens.services"

interface ILogin {
    address: string
    messageRaw: string
    signature: string
}

export const UserService = {
    async userLogin(data: ILogin) {
        axios.post(`${API_URl}/api/login`, data)  
    }
}