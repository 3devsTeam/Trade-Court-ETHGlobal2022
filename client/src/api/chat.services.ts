import { api } from './axios'

export const ChatServices = {
  async getAll() {
    return api.get('/api/chat')
  },
  async getById(id: string) {
    return api.get(`/api/chat/${id}`, { withCredentials: true })
  },
  async joinById(id: string) {
    return api.post(`/api/chat/${id}`)
  },
  async deleteById(id: string) {
    return api.delete(`/api/chat/${id}`)
  },
  async createChat() {
    return api.post('/api/chat')
  },
  async sendMessageById(id: string, message: string) {
    return api.post(`/api/chat/message/${id}`, { content: message }, { withCredentials: true })
  }
}
