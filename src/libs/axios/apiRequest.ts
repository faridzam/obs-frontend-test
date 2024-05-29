import axios, { Axios, AxiosRequestConfig } from 'axios';

type IConfig = AxiosRequestConfig & {
  isLoading?: boolean;
};

const requestConfig: IConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    accept: 'application/json',
  },
};

class HttpRequest {
  api: Axios;
  constructor() {
    this.api = axios.create(requestConfig);

    this.api.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        return Promise.reject(error);
      }
    );
  }

  async get(endpoint: string, config?: IConfig) {
    return this.api.get(endpoint, config);
  }
  async post(endpoint: string, data: unknown, config?: IConfig) {
    return this.api.post(endpoint, data, config);
  }
  async patch(endpoint: string, data: unknown, config?: IConfig) {
    return this.api.patch(endpoint, data, config);
  }
  async delete(endpoint: string) {
    return this.api.delete(endpoint);
  }
}

export const apiRequest = new HttpRequest();
