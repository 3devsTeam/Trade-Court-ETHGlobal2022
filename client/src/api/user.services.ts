import { api } from './axios'

interface ILogin {
  address: string | undefined
  messageRaw: string
  signature: string | undefined
}
export const UserService = {
  async login(data: ILogin) {
    return api.post(`/api/user/login`, data, {
      withCredentials: true
    })
  },
  async logout() {
    return api.get(`/api/user/logout`, { withCredentials: true })
  },
  async getOffers() {
    return api.get(`/api/user/offers`, { withCredentials: true })
  },
  async getUserRooms() {
    return api.get('/api/user/rooms', { withCredentials: true })
  }
}
