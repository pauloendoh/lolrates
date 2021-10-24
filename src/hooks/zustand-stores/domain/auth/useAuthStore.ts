import { parseCookies } from "nookies";
import create, { SetState } from "zustand";

interface IAuthStore {
  username: string;
  setUsername: (username: string) => void;
}

const cookies = parseCookies();

// PE 1/3 - not being used. Delete?
const useAuthStore = create<IAuthStore>((set: SetState<IAuthStore>) => ({
  username: cookies.username?.length ? cookies.username : "",
  setUsername: (username) => set({ username: username }),
}));

export default useAuthStore;
