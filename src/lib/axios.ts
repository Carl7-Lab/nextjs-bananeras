import axios from 'axios';
import { getSession, useSession } from 'next-auth/react';
import { BACKEND_URL } from './constants';

const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session) {
      config.headers.Authorization = `Bearer ${session.refreshToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
