import useChampionsQuery from "hooks/react-query/domain/draft/useChampionsQuery";
import useSelectedChampionsStore from "hooks/zustand-stores/domain/draft/useSelectedChampionsStore";
import { useEffect, useMemo, useState } from "react";
import { ChampionRoleType } from "../../../../../types/domain/rates/ChampionRoleType";
import {
  LolRateChampionDto,
  getLolRateChampionDto,
} from "../../../../../types/domain/rates/LolRateChampionDto";
import DraftRowCol1 from "./DraftCol1/DraftCol1";
import DraftCol2 from "./DraftCol2/DraftCol2";
import DraftRowCol3 from "./DraftCol3/DraftCol3";
import S from "./DraftRow.styles";

type FilterBy = "All" | "Over 50.5% WR";

const DraftRow = (props: {
  role: ChampionRoleType;
  roleRates: LolRateChampionDto[];
  hasBorderBottom: boolean;
  sortBy: FilterBy;
  setSortBy: (newSortBy: FilterBy) => void;
}) => {
  const [selectedChampionRate, setSelectedChampionRate] =
    useState<LolRateChampionDto>(null);

  // PE 2/3 - maybe a getSelectedChampion(role) should be created?
  const { setChampion } = useSelectedChampionsStore();

  // PE 2/3 - DRY...
  useEffect(() => {
    if (selectedChampionRate) setChampion(selectedChampionRate);
  }, [selectedChampionRate]);

  // PE 2/3 - could have a selectedPlayers on selectedChampionsStore
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | "">("");

  const { data: allChampions } = useChampionsQuery();

  // PE 2/3 - should be componentized in the 1st column
  const selectedChampion = useMemo(() => {
    if (selectedChampionRate && allChampions?.length) {
      return allChampions.find(
        (c) => c.name === selectedChampionRate.championName
      );
    }
    return null;
  }, [selectedChampionRate, allChampions]);

  // PE 2/3
  const onSelectChampion = (championId: number) => {
    if (allChampions?.length > 0) {
      const champion = allChampions.find((c) => c.id === championId);

      if (champion) {
        const rateFound = props.roleRates.find(
          (rate) => rate.championName === champion.name
        );
        if (rateFound) setSelectedChampionRate(rateFound);
        else
          setSelectedChampionRate(getLolRateChampionDto(champion, props.role));
      }
    }
  };

  return (
    <S.Root hasBorderBottom={props.hasBorderBottom}>
      {/* PE 2/3 */}
      <DraftRowCol1
        role={props.role}
        roleRates={props.roleRates}
        playerId={selectedPlayerId}
        onChangePlayerId={setSelectedPlayerId}
        championRate={selectedChampionRate}
        onChangeChampionRate={setSelectedChampionRate}
        champion={selectedChampion}
        onChangeChampionId={onSelectChampion}
      />

      {/* PE 2/3 */}
      <DraftCol2
        role={props.role}
        roleRates={props.roleRates}
        selectedPlayerId={selectedPlayerId}
        selectedChampionRate={selectedChampionRate}
        onSelectChampionRate={setSelectedChampionRate}
      />

      {/* PE 2/3 */}
      <DraftRowCol3
        championRoleRow={props.role}
        roleRates={props.roleRates}
        sortBy={props.sortBy}
        setSortBy={props.setSortBy}
        selectedChampionRate={selectedChampionRate}
        setSelectedChampionRate={setSelectedChampionRate}
      />
    </S.Root>
  );
};

export default DraftRow;
