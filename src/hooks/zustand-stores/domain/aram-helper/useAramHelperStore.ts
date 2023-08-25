import { AramChampionWinRateDto } from "@/hooks/react-query/domain/aram-helper/types/AramChampionWinRateDto";
import create from "zustand";

interface IStore {
  lolgraphsUrl: string;
  setLolgraphsUrl: (summonerName: string) => void;
  availableChampions: AramChampionWinRateDto[];
  setAvailableChampions: (champions: AramChampionWinRateDto[]) => void;

  selectedChampion: AramChampionWinRateDto | null;
  setSelectedChampion: (champion: AramChampionWinRateDto | null) => void;
}

const useAramHelperStore = create<IStore>((set, get) => ({
  lolgraphsUrl: "",
  setLolgraphsUrl: (summonerName) => {
    set({ lolgraphsUrl: summonerName });
  },

  availableChampions: [],
  setAvailableChampions: (champions) => {
    set({ availableChampions: champions });
  },

  selectedChampion: null,
  setSelectedChampion: (champion) => {
    set({ selectedChampion: champion });
  },
}));

export default useAramHelperStore;
