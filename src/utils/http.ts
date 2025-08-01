import axios, { type AxiosRequestConfig } from "axios";
import { useUserStore } from "@/stores/UserStore.ts";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
});

instance.interceptors.request.use((config) => {
  const store = useUserStore();
  if (!store.token) {
    return config;
  }
  const token = store.token;
  if (!token) {
    return config;
  }
  config.headers["token"] = token;
  return config;
});

const http = async <T>(config: AxiosRequestConfig): Promise<Result<T>> => {
  const { data } = await instance.request<Result<T>>(config);
  return data;
};

export default http;
