import { Link } from "@material-ui/core";
import React from "react";
import useChampionsQuery from "../../../../../../hooks/react-query/domain/draft/useChampionsQuery";
import usePlayersQuery from "../../../../../../hooks/react-query/domain/draft/usePlayersQuery";
import useSelectedChampionsStore from "../../../../../../hooks/zustand-stores/domain/draft/useSelectedChampionsStore";
import { ChampionDto } from "../../../../../../types/domain/draft/ChampionDto";
import { ChampionRoleType } from "../../../../../../types/domain/rates/ChampionRoleType";
import { LolRateChampionDto } from "../../../../../../types/domain/rates/LolRateChampionDto";
import { formatWinPickRate } from "../../../../../../utils/domain/rates/formatWinPickRate";
import Txt from "../../../../../_common/text/Txt";
import SelectChampionAtRow from "../_common/SelectChampionAtRow/SelectChampionAtRow";
import S from "./DraftCol1.styles";
import PlayerSelector from "./PlayerSelector/PlayerSelector";

const DraftRowCol1 = (props: {
  role: ChampionRoleType;
  roleRates: LolRateChampionDto[];

  playerId: number | "";
  onChangePlayerId: (value: number | "") => void;

  championRate: LolRateChampionDto;
  onChangeChampionRate: (value: LolRateChampionDto) => void;

  champion: ChampionDto;
  onChangeChampionId: (championId: number) => void;
}) => {
  // PE 2/3 - maybe a getSelectedChampion(role) should be created?
  const { removeChampion } = useSelectedChampionsStore();

  const { allPlayers } = usePlayersQuery();

  const { data: allChampions } = useChampionsQuery();

  return (
    <S.Root>
      {props.championRate?.iconUrl.length > 0 ? (
        <img
          src={props.championRate?.iconUrl}
          style={{
            height: 48,
            borderRadius: 100,
          }}
        />
      ) : (
        <S.QuestionMarkWrapper>
          <Txt variant="h5">?</Txt>
        </S.QuestionMarkWrapper>
      )}

      <S.InfoColumn px={1}>
        <S.RoleNameWrapper>
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
        </S.RoleNameWrapper>

        {allPlayers?.length > 0 && (
          <S.InfoColContent>
            <PlayerSelector
              role={props.role}
              playerOptions={allPlayers}
              selectedPlayerId={props.playerId}
              onChange={props.onChangePlayerId}
            />
          </S.InfoColContent>
        )}
        <S.InfoColContent>
          <SelectChampionAtRow
            championOptions={allChampions ? allChampions : []}
            onChange={props.onChangeChampionId}
            selectedChampionId={props.champion ? props.champion.id : null}
            width="100%"
          />
          {props.championRate?.avgWin > 0 && (
            <S.RatesWrapper>
              <Txt>{formatWinPickRate(props.championRate.avgWin)} win</Txt>
              <Txt>{formatWinPickRate(props.championRate.avgPick)} pick</Txt>
            </S.RatesWrapper>
          )}
        </S.InfoColContent>
      </S.InfoColumn>
    </S.Root>
  );
};

export default DraftRowCol1;
