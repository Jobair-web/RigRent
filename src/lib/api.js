import axios from "axios";
import { authClient } from "./auth-client";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/** For public endpoints (no token). */
export const publicApi = axios.create({ baseURL });

/** For protected endpoints: attaches the Better Auth JWT as a Bearer token. */
export const api = axios.create({ baseURL });

let cache = { token: null, exp: 0 };
export const clearToken = () => {
  cache = { token: null, exp: 0 };
};

async function getToken() {
  if (cache.token && Date.now() < cache.exp - 30_000) return cache.token;
  try {
    const { data } = await authClient.token();
    if (!data?.token) return null;
    const payload = JSON.parse(atob(data.token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    cache = { token: data.token, exp: payload.exp * 1000 };
    return cache.token;
  } catch {
    return null;
  }
}

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) clearToken();
    return Promise.reject(err);
  }
);
