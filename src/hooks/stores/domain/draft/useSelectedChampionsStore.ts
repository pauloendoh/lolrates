import produce from "immer";
import create, { GetState, SetState } from "zustand";
import { LolRateChampionDto } from "../../../../types/domain/rates/LolRateChampionDto";

interface ISelectedChampionsStore {
  selectedChampions: LolRateChampionDto[];
  setChampion: (champion: LolRateChampionDto) => void;
  removeChampion: (championName: string) => void;
}

const useSelectedChampionsStore = create<ISelectedChampionsStore>(
  (
    set: SetState<ISelectedChampionsStore>,
    get: GetState<ISelectedChampionsStore>
  ) => ({
    selectedChampions: [],
    setChampion: (champion) => {
      const { selectedChampions } = get();

      const newSelected = produce(selectedChampions, (draft) => {
        const index = selectedChampions.findIndex(
          (c) => c.role === champion.role // if is changing champion at role
        );

        if (~index) {
          draft[index] = champion;
        } else draft = [...draft, champion];

        return draft;
      });

      set({ selectedChampions: newSelected });
    },
    removeChampion: (championName) => {
      const { selectedChampions } = get();
      const newSelected = selectedChampions.filter(
        (c) => c.championName !== championName
      );
      set({ selectedChampions: newSelected });
    },
  })
);

export default useSelectedChampionsStore;
