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
  async takerSend(id: string) {
    return api.get(`/api/offer/${id}/send`, { withCredentials: true })
  },
  async makerRecieved(id: string) {
    return api.get(`/api/offer/${id}/recieve`, { withCredentials: true })
  },
  async claimByID(id: string) {
    return api.get(`/api/offer/${id}/claim`, {
      withCredentials: true
    })
  },
  async getFiltered(page: number, limit = 5, tags: any) {
    const isFilterOn = Object.values(tags).join('') !== ''

    if (isFilterOn) {
      const filters = Object.entries(tags)
        .map(([key, value]) => {
          if (value) return `search[${key}]=${value}&`
        })
        .join('')
        .slice(0, -1)

      const { data } = await api.get(`/api/offer/?page=${page}&limit=${limit}&${filters}`)
      return data.data.offers
    }

    const { data } = await api.get(`/api/offer/?page=${page}&limit=${limit}`)
    return data.data.offers
  }
}
