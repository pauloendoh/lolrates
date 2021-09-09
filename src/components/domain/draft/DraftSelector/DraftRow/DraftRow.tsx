import { Box } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import myColors from "../../../../../consts/myColors";
import useChampionsQuery from "../../../../../hooks/react-query/auth/useChampionsQuery";
import useSelectedChampionsStore from "../../../../../hooks/stores/domain/draft/useSelectedChampionsStore";
import { ChampionRoleType } from "../../../../../types/LolRate/ChampionRoleType";
import {
  getLolRateDto,
  ILolRateChampion
} from "../../../../../types/LolRate/ILolRateChampion";
import Flex from "../../../../Shared/Flexboxes/Flex";
import DraftRowCol1 from "./DraftRowCol1/DraftRowCol1";
import DraftRowCol2 from "./DraftRowCol2/DraftRowCol2";
import DraftRowCol3 from "./DraftRowCol3/DraftRowCol3";

type FilterBy = "All" | "Over 51% WR";

const DraftRow = (props: {
  role: ChampionRoleType;
  roleRates: ILolRateChampion[];
  hasBorderBottom: boolean;
  sortBy: FilterBy;
  setSortBy: (newSortBy: FilterBy) => void;
}) => {
  const [selectedChampionRate, setSelectedChampionRate] =
    useState<ILolRateChampion>(null);

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
        else setSelectedChampionRate(getLolRateDto(champion, props.role));
      }
    }
  };

  return (
    <Box
      py={1}
      key={props.role}
      borderBottom={
        props.hasBorderBottom ? `1px solid ${myColors.borderColor}` : null
      }
    >
      <Flex>
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
        <DraftRowCol2
          role={props.role}
          roleRates={props.roleRates}
          selectedPlayerId={selectedPlayerId}
          selectedChampionRate={selectedChampionRate}
          onSelectChampionRate={setSelectedChampionRate}
        />

        {/* PE 2/3 */}
        <DraftRowCol3
          role={props.role}
          roleRates={props.roleRates}
          sortBy={props.sortBy}
          setSortBy={props.setSortBy}
          selectedChampionRate={selectedChampionRate}
          setSelectedChampionRate={setSelectedChampionRate}
        />
      </Flex>
    </Box>
  );
};

export default DraftRow;