import { api } from './axios'

export const FiatServices = {
  async getFiat() {
    const { data } = await api.get(`/api/fiat`)
    return data
  },
  async getBanks() {
    const { data } = await api.get(`/api/bank`)
    return data
  }
}
