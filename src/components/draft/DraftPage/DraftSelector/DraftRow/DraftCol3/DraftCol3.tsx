import Txt from "@/components/_common/text/Txt";
import ChampionTooltipTitle from "@/components/winrates/WinratesPage/ChampionSitesTooltip/ChampionTooltipTitle";
import { ChampionRoleType } from "@/types/domain/rates/ChampionRoleType";
import { Tooltip } from "@material-ui/core";
import useSelectedChampionsStore from "hooks/zustand-stores/domain/draft/useSelectedChampionsStore";
import { useEffect } from "react";
import { LolRateChampionDto } from "types/domain/rates/LolRateChampionDto";
import { getChampionImageBorder } from "utils/domain/rates/getChampionImageBorder";
import DraftFilter from "./DraftChampionFilter/DraftFilter";
import S from "./DraftCol3.styles";
type FilterBy = "All" | "Over 50.5% WR";

const DraftRowCol3 = (props: {
  championRoleRow: ChampionRoleType;
  roleRates: LolRateChampionDto[];
  sortBy: FilterBy;
  setSortBy: (newSortBy: FilterBy) => void;

  selectedChampionRate: LolRateChampionDto;
  setSelectedChampionRate: (value: LolRateChampionDto) => void;
}) => {
  // PE 2/3 - maybe a getSelectedChampion(role) should be created?
  const { setChampion } = useSelectedChampionsStore();

  // PE 2/3 - DRY...
  useEffect(() => {
    if (props.selectedChampionRate) setChampion(props.selectedChampionRate);
  }, [props.selectedChampionRate]);

  // PE 2/3 - Should be divided into a <DraftSelectRowCol3/> + useMemo()
  // Returns rates by role, over 50.5% win rate and in descending order
  const getBestChampions = () => {
    if (props.sortBy === "All")
      return [...props.roleRates].sort((a, b) => b.avgWin - a.avgWin);
    else {
      const ratesOver51 = [...props.roleRates].filter((r) => r.avgWin >= 50.5);
      return ratesOver51.sort((a, b) => b.avgWin - a.avgWin);
    }
  };

  return (
    <S.Root>
      <S.Header>
        <Txt>Best rates at {props.championRoleRow}</Txt>

        {props.championRoleRow === "TOP" && (
          <DraftFilter
            championRole={props.championRoleRow}
            setSortBy={props.setSortBy}
            sortBy={props.sortBy}
          />
        )}
      </S.Header>
      {/* Showing champion icons */}
      <S.ChampionImgs>
        {getBestChampions().map((championRate, i) => (
          <Tooltip
            key={i}
            enterDelay={500}
            enterNextDelay={500}
            interactive
            title={<ChampionTooltipTitle rate={championRate} />}
          >
            <img
              onClick={() => props.setSelectedChampionRate(championRate)}
              src={championRate.iconUrl}
              style={{
                width: 32,
                borderRadius: 100,
                border: getChampionImageBorder(championRate.avgWin),
                cursor: "pointer",
              }}
            />
          </Tooltip>
        ))}
      </S.ChampionImgs>
    </S.Root>
  );
};

export default DraftRowCol3;
