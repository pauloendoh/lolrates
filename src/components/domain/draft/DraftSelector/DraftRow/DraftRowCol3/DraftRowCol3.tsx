import { LolRateChampionDto } from "types/domain/rates/LolRateChampionDto";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip
} from "@material-ui/core"
import ChampionTooltipTitle from "components/domain/rates/ChampionTooltipTitle";
import Flex from "components/UI/Flexboxes/Flex";
import FlexVCenter from "components/UI/Flexboxes/FlexVCenter";
import Txt from "components/UI/Text/Txt";
import useSelectedChampionsStore from "hooks/zustand-stores/domain/draft/useSelectedChampionsStore";
import React, { useEffect } from "react";
import { getChampionImageBorder } from "utils/domain/rates/getChampionImageBorder";
import { ChampionRoleType } from "../../../../../../types/domain/rates/ChampionRoleType";

type FilterBy = "All" | "Over 51% WR";

const DraftRowCol3 = (props: {
  role: ChampionRoleType;
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
  // Returns rates by role, over 51% win rate and in descending order
  const getBestChampions = () => {
    if (props.sortBy === "All")
      return [...props.roleRates].sort((a, b) => b.avgAvg - a.avgAvg);
    else {
      const ratesOver51 = [...props.roleRates].filter((r) => r.avgWin >= 51);
      return ratesOver51.sort((a, b) => b.avgAvg - a.avgAvg);
    }
  };

  return (
    <Box flexGrow={1} px={1}>
      <FlexVCenter pb={0.5} justifyContent="space-between">
        <Txt>Best rates at {props.role}</Txt>

        {/* PE 1/3 - componentize this  */}
        {props.role === "TOP" && (
          <FlexVCenter>
            <FormControl size="small" variant="outlined">
              <InputLabel id={`input-label-${props.role}`}>Show</InputLabel>
              <Select
                labelId={`input-label-${props.role}`}
                value={props.sortBy}
                onChange={(e) => props.setSortBy(e.target.value as any)}
                label="Sort by"
              >
                <MenuItem value={"All" as FilterBy}>All</MenuItem>
                <MenuItem value={"Over 51% WR" as FilterBy}>Over 51%</MenuItem>
              </Select>
            </FormControl>
          </FlexVCenter>
        )}
      </FlexVCenter>
      {/* Showing champion icons */}
      <Flex flexWrap="wrap" style={{ gap: 8 }}>
        {getBestChampions().map((championRate, i) => (
          <Box key={i}>
            <Tooltip
              enterDelay={500}
              enterNextDelay={500}
              interactive
              title={
                <ChampionTooltipTitle
                  championName={championRate.championName}
                />
              }
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
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default DraftRowCol3;
