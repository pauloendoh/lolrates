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
import Flex from "../../Shared/Flexboxes/Flex";
import Txt from "../../Shared/Text/Txt";

// PE 2/3
const DraftSelector = (props: { rates: ILolRateChampion[] }) => {
  const [selectedChampions, setSelectedChampions] = useState(
    getEmptySelectedChampions()
  );

  // Returns rates by role, over 51% win rate and in descending order
  const getBestChampionsByRole = (role: ChampionRoleType) => {
    const ratesOver51 = [...props.rates].filter(
      (r) => r.avgWin >= 51 && r.role === role
    );
    return ratesOver51.sort((a, b) => b.avgWin - a.avgWin);
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
              <Box width={216} minHeight={128}>
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

              <Box width={216}>
                <Box pb={0.5}>
                  <Txt>Best rates at {role}</Txt>
                </Box>

                {/* Showing champion icons */}
                <Flex flexWrap="wrap">
                  {getBestChampionsByRole(role).map((championRate, i) => (
                    <Box mr={0.5} mb={1} key={i}>
                      <img
                        onClick={() =>
                          selectChampionForRole(championRate, role)
                        }
                        src={championRate.iconUrl}
                        style={{
                          width: 32,
                          borderRadius: 100,
                          cursor: "pointer",
                        }}
                      />
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
