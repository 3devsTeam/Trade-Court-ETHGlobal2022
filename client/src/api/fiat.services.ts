import axios from "axios";
import { API_URl } from "./axios";

export const FiatServices = {
  async getFiat() {
    const { data } = await axios.get(`${API_URl}/api/fiat`);
    return data;
  },
  async getBanks() {
    const { data } = await axios.get(`${API_URl}/api/bank`);
    return data;
  },
};
