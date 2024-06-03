import axios from "axios";
import { parseCookies } from "nookies";

// Server axios will get the auth token from the next server context cookies
export default function myServerAxios(ctx: any) {
  const serverAxios = axios.create();

  serverAxios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

  serverAxios.interceptors.request.use((config) => {
    const { user: userStr } = parseCookies(ctx);

    if (userStr) config.headers["x-auth-token"] = JSON.parse(userStr).token;
    return config;
  });

  serverAxios.interceptors.response.use((response) => {
    return response;
  });

  return serverAxios;
}
