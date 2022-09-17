import axios from 'axios';

import { API_URl } from './axios';

interface ILogin {
  address: string;
  messageRaw: string;
  signature: string;
}
export const UserService = {
  async userLogin(data: ILogin) {
    return axios.post(`${API_URl}/api/user/login`, data, {
      withCredentials: true,
    });
  },
};
