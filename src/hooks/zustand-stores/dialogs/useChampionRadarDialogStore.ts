import { ChampionRadarDto } from "@/types/domain/draft/ChampionRadarDto";
import create from "zustand";

type IStore = {
  initialValue: ChampionRadarDto | null;
  isOpen: boolean;
  openDialog: (initialValue: ChampionRadarDto) => void;
  closeDialog: () => void;
};

export const useChampionRadarDialogStore = create<IStore>((set) => ({
  initialValue: null,
  isOpen: false,
  openDialog: (initialValue) => set({ isOpen: true, initialValue }),
  closeDialog: () => set({ isOpen: false }),
}));
