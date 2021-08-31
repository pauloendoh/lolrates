import produce from "immer";
import create, { GetState, SetState } from "zustand";
import { ILolRateChampion } from "../../../../types/LolRate/ILolRateChampion";

interface ISelectedChampionsStore {
  selectedChampions: ILolRateChampion[];
  setChampion: (champion: ILolRateChampion) => void;
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
  })
);

export default useSelectedChampionsStore;
