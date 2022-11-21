import axios from "axios";
import { parseCookies } from "nookies";

// Client axios will get the auth token from the browser cookies
const myClientAxios = axios.create();

myClientAxios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

myClientAxios.interceptors.request.use((config) => {
  const { user: userStr } = parseCookies();
  console.log({ userStr });

  if (userStr) config.headers["x-auth-token"] = JSON.parse(userStr).token;
  return config;
});

myClientAxios.interceptors.response.use((response) => {
  console.log({ response });
  return response;
});

export default myClientAxios;
