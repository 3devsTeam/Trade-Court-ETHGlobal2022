import { api } from './axios'

export const OfferService = {
  async create(data: any) {
    return api.post(`/api/offer`, data, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    })
  },
  async joinByID(id: string, data: any) {
    return api.post(`/api/offer/${id}`, data, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    })
  },
  async getByID(id: string) {
    return api.get(`/api/offer/${id}`, { withCredentials: true })
  },
  async deleteByID(id: string) {
    return api.delete(`/api/offer/${id}`, {
      withCredentials: true
    })
  },
  async claimByID(id: string) {
    return api.get(`/api/offer/${id}/claim`, {
      withCredentials: true
    })
  },
  async getAll(page: number, limit = 5, tags: any) {
    if (Object.values(tags).join('') !== '') {
      const filters = Object.entries(tags)
        .map((tag) => {
          if (tag[1] !== '') {
            return `search[${tag[0]}]=${tag[1]}`
          }
        })
        .join('&')

      const { data } = await api.get(`/api/offer/?page=${page}&limit=${limit}&${filters}`)
      return data.data.offers
    }

    const { data } = await api.get(`/api/offer/?page=${page}&limit=${limit}`)
    return data.data.offers
  }
}
