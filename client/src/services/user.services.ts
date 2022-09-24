import axios from 'axios';

import { API_URl } from './axios';

interface ILogin {
  address: string | undefined;
  messageRaw: string;
  signature: string | undefined;
}
export const UserService = {
  async login(data: ILogin) {
    return axios.post(`${API_URl}/api/user/login`, data, {
      withCredentials: true,
    });
  },
  async logout() {
    return axios.get(`${API_URl}/api/user/logout`, { withCredentials: true})
  }
};
