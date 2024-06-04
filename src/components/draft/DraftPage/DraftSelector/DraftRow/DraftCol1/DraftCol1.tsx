import Flex from "@/components/_common/flexboxes/Flex";
import FlexCol from "@/components/_common/flexboxes/FlexCol";
import { formatWinPickRate } from "@/utils/domain/rates/formatWinPickRate";
import { Link } from "@material-ui/core";
import useChampionsQuery from "../../../../../../hooks/react-query/domain/draft/useChampionsQuery";
import usePlayersQuery from "../../../../../../hooks/react-query/domain/draft/usePlayersQuery";
import useSelectedChampionsStore from "../../../../../../hooks/zustand-stores/domain/draft/useSelectedChampionsStore";
import { ChampionDto } from "../../../../../../types/domain/draft/ChampionDto";
import { ChampionRoleType } from "../../../../../../types/domain/rates/ChampionRoleType";
import { LolRateChampionDto } from "../../../../../../types/domain/rates/LolRateChampionDto";
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
        </S.InfoColContent>

        <Flex
          mt={1}
          style={{
            gap: 8,
          }}
        >
          {props.championRate?.iconUrl.length > 0 ? (
            <img
              alt="champion icon"
              src={props.championRate?.iconUrl}
              style={{
                height: 40,
                width: 40,
                borderRadius: 100,
              }}
            />
          ) : null}
          {props.championRate?.avgWin > 0 && (
            <FlexCol
              style={{
                fontSize: "12px !important",
              }}
            >
              <Txt>{formatWinPickRate(props.championRate.avgWin)} win</Txt>
              <Txt>{formatWinPickRate(props.championRate.avgPick)} pick</Txt>
            </FlexCol>
          )}
        </Flex>
      </S.InfoColumn>
    </S.Root>
  );
};

export default DraftRowCol1;
