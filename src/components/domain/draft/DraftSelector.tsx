import {
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Tooltip,
  useTheme,
} from "@material-ui/core";
import { Box, Paper } from "@material-ui/core";
import React, { useState } from "react";
import myColors from "../../../consts/myColors";
import {
  ChampionRoleType,
  roles,
} from "../../../types/LolRate/ChampionRoleType";
import { ILolRateChampion } from "../../../types/LolRate/ILolRateChampion";
import { getEmptySelectedChampions } from "../../../types/LolRate/ISelectedChampions";
import { formatWinPickRate } from "../../../utils/domain/rates/formatWinPickRate";
import ChampionTooltip from "../../LolRates/ChampionPickWinTooltip/ChampionPickWinTooltip";
import Flex from "../../Shared/Flexboxes/Flex";
import FlexVCenter from "../../Shared/Flexboxes/FlexVCenter";
import Txt from "../../Shared/Text/Txt";
import ChampionTooltipTitle from "../rates/ChampionTooltipTitle";

type FilterByType = "All" | "Over 51% WR";

// PE 2/3
const DraftSelector = (props: { rates: ILolRateChampion[] }) => {
  const [selectedChampions, setSelectedChampions] = useState(
    getEmptySelectedChampions()
  );

  const [sortBy, setSortBy] = useState<FilterByType>("Over 51% WR");

  // Returns rates by role, over 51% win rate and in descending order
  const getBestChampionsByRole = (role: ChampionRoleType) => {
    if (sortBy === "All")
      return [...props.rates]
        .filter((r) => r.role === role)
        .sort((a, b) => b.avgAvg - a.avgAvg);
    else {
      const ratesOver51 = [...props.rates].filter(
        (r) => r.avgWin >= 51 && r.role === role
      );
      return ratesOver51.sort((a, b) => b.avgAvg - a.avgAvg);
    }
  };

  const selectChampionForRole = (
    champion: ILolRateChampion,
    role: ChampionRoleType
  ) => {
    setSelectedChampions({ ...selectedChampions, [role]: champion });
  };

  const getSelectedChampionAtRole = (role: ChampionRoleType) => {
    return selectedChampions[role];
  };

  const theme = useTheme();
  const getBorder = (avgWin: number) => {
    if (avgWin >= 51) return `2px solid ${theme.palette.primary.main}`;
    if (avgWin >= 49) return `2px solid ${myColors.ratingYellow[5]}`;
    return `2px solid ${theme.palette.error.main}`;
  };

  return (
    <Paper>
      <Box px={2} py={1}>
        {/* iterating roles */}
        {roles.map((role, index) => (
          <Box
            pt={1}
            key={role}
            borderBottom={
              index !== roles.length - 1 ? `1px solid ${myColors.border}` : null
            }
          >
            <Flex>
              <Box minWidth={216} minHeight={128}>
                {getSelectedChampionAtRole(role) && (
                  <Flex>
                    <img
                      src={getSelectedChampionAtRole(role).iconUrl}
                      style={{
                        height: 48,
                        borderRadius: 100,
                        cursor: "pointer",
                      }}
                    />

                    <Box ml={1}>
                      <Box>
                        <Txt>
                          {getSelectedChampionAtRole(role).championName}
                        </Txt>
                      </Box>
                      <Box>
                        <Txt>
                          {formatWinPickRate(
                            getSelectedChampionAtRole(role).avgWin
                          )}{" "}
                          win ·{" "}
                          {formatWinPickRate(
                            getSelectedChampionAtRole(role).avgPick
                          )}{" "}
                          pick
                        </Txt>
                      </Box>
                    </Box>
                  </Flex>
                )}
              </Box>

              <Box flexGrow={1}>
                <FlexVCenter pb={0.5} justifyContent="space-between">
                  <Txt>Best rates at {role}</Txt>
                  {role === "TOP" && (
                    <FlexVCenter>
                      <FormControl size="small" variant="outlined">
                        <InputLabel id={`input-label-${role}`}>
                          Show
                        </InputLabel>
                        <Select
                          labelId={`input-label-${role}`}
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value as any)}
                          label="Sort by"
                        >
                          <MenuItem value={"All" as FilterByType}>All</MenuItem>
                          <MenuItem value={"Over 51% WR" as FilterByType}>
                            Over 51%
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </FlexVCenter>
                  )}
                </FlexVCenter>
                {/* Showing champion icons */}
                <Flex flexWrap="wrap">
                  {getBestChampionsByRole(role).map((championRate, i) => (
                    <Box mr={0.5} mb={1} key={i}>
                      <Tooltip
                      enterDelay={500}
                      enterNextDelay={500}
                        interactive
                        title={<ChampionTooltipTitle rate={championRate} />}
                      >
                        <img
                          onClick={() =>
                            selectChampionForRole(championRate, role)
                          }
                          src={championRate.iconUrl}
                          style={{
                            width: 32,
                            borderRadius: 100,
                            border: getBorder(championRate.avgWin),
                            cursor: "pointer",
                          }}
                        />
                      </Tooltip>
                    </Box>
                  ))}
                </Flex>
              </Box>
            </Flex>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default DraftSelector;
