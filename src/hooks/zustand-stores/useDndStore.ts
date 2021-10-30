import create from "zustand";
import { devtools, NamedSet } from "zustand/middleware";

interface IDndStore {
  draggingItemId: number;
  setDraggingItemId: (id: number) => void;

  throttle: NodeJS.Timeout;
  setThrottle: (timeout: NodeJS.Timeout) => void;
}

const useDndStore = create<IDndStore>(
  devtools(
    (set: NamedSet<IDndStore>) => ({
      draggingItemId: null,
      setDraggingItemId: (id) => {
        set({ draggingItemId: id }, undefined, "setDraggingItemId");
      },

      throttle: null,
      setThrottle: (throttle) => {
        set({ throttle });
      },
    }),
    "@DndStore"
  )
);

export default useDndStore;
