import { Box, Link } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import myColors from "../../../../../../utils/myColors";
import useChampionsQuery from "../../../../../../hooks/react-query/domain/draft/useChampionsQuery";
import usePlayersQuery from "../../../../../../hooks/react-query/domain/draft/usePlayersQuery";
import useSelectedChampionsStore from "../../../../../../hooks/zustand-stores/domain/draft/useSelectedChampionsStore";
import { ChampionDto } from "../../../../../../types/domain/draft/ChampionDto";
import { ChampionRoleType } from "../../../../../../types/domain/rates/ChampionRoleType";
import {
  getLolRateChampionDto,
  LolRateChampionDto,
} from "../../../../../../types/domain/rates/LolRateChampionDto";
import { formatWinPickRate } from "../../../../../../utils/domain/rates/formatWinPickRate";
import Flex from "../../../../../UI/Flexboxes/Flex";
import FlexVCenter from "../../../../../UI/Flexboxes/FlexVCenter";
import Txt from "../../../../../UI/Text/Txt";
import ChampionSelector from "../../../selectors/ChampionSelector/ChampionSelector";
import PlayerSelector from "../../../selectors/PlayerSelector/PlayerSelector";

const DraftRowCol1 = (props: {
  role: ChampionRoleType;
  roleRates: LolRateChampionDto[];

  playerId: number | "";
  onChangePlayerId: (value: number | "") => void;

  championRate: LolRateChampionDto;
  onChangeChampionRate: (value: LolRateChampionDto) => void;

  champion: ChampionDto;
  onChangeChampionId: (championId: number) => void
}) => {
  // PE 2/3 - maybe a getSelectedChampion(role) should be created?
  const { removeChampion } = useSelectedChampionsStore();

  const { allPlayers } = usePlayersQuery();

  const { data: allChampions } = useChampionsQuery();


  return (
    <Box minWidth={216} minHeight={128}>
      <Flex>
        {props.championRate?.iconUrl.length > 0 ? (
          <img
            src={props.championRate?.iconUrl}
            style={{
              height: 48,
              borderRadius: 100,
            }}
          />
        ) : (
          <FlexVCenter
            justifyContent="center"
            height={48}
            minWidth={48}
            bgcolor={myColors.dark.lightDark}
            borderRadius={48}
          >
            <Txt variant="h5">?</Txt>
          </FlexVCenter>
        )}

        <Box px={1} width="100%">
          <FlexVCenter justifyContent="space-between">
            <Txt>{props.role}</Txt>

            {props.championRate && (
              <Link
                onClick={() => {
                  props.onChangeChampionRate(null);
                  removeChampion(props.championRate.championName);
                }}
              >
                Clear
              </Link>
            )}
          </FlexVCenter>

          {allPlayers?.length > 0 && (
            <Box mt={1}>
              <PlayerSelector
                role={props.role}
                playerOptions={allPlayers}
                selectedPlayerId={props.playerId}
                onChange={props.onChangePlayerId}
              />
            </Box>
          )}
          <Box mt={1}>
            <ChampionSelector
              championOptions={allChampions ? allChampions : []}
              onChange={props.onChangeChampionId}
              selectedChampionId={props.champion ? props.champion.id : null}
              width="100%"
            />
            {props.championRate?.avgWin > 0 && (
              <Box mt={1}>
                <Txt>{formatWinPickRate(props.championRate.avgWin)} win</Txt>

                <Box>
                  <Txt>
                    {formatWinPickRate(props.championRate.avgPick)} pick
                  </Txt>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default DraftRowCol1;
