import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useSelectedChampionsStore from "hooks/zustand-stores/domain/draft/useSelectedChampionsStore";
import { useEffect, useState } from "react";
import useDeletePlayerChampionMutation from "../../../../../../hooks/react-query/domain/draft/playerChampion/useDeletePlayerChampionMutation";
import usePlayerChampionsQuery from "../../../../../../hooks/react-query/domain/draft/playerChampion/usePlayerChampionsQuery";
import useChampionsQuery from "../../../../../../hooks/react-query/domain/draft/useChampionsQuery";
import {
  getEmptyPlayerChampionDto,
  getFilledPlayerChampionDto,
  PlayerChampionDto,
} from "../../../../../../types/domain/draft/PlayerChampionDto";
import { SkillLevelTypes } from "../../../../../../types/domain/draft/SkillLevelTypes";
import { ChampionRoleType } from "../../../../../../types/domain/rates/ChampionRoleType";
import {
  getLolRateChampionDto,
  LolRateChampionDto,
} from "../../../../../../types/domain/rates/LolRateChampionDto";
import Txt from "../../../../../_common/text/Txt";
import S from "./DraftCol2.styles";
import PlayerChampionDialog from "./PlayerChampionDialog/PlayerChampionDialog";
import PlayerChampionImage from "./PlayerChampionImage/PlayerChampionImage";

const DraftCol2 = (props: {
  role: ChampionRoleType;
  roleRates: LolRateChampionDto[];

  selectedPlayerId: number | "";

  selectedChampionRate: LolRateChampionDto;
  onSelectChampionRate: (value: LolRateChampionDto) => void;
}) => {
  // PE 2/3 - maybe a getSelectedChampion(role) should be created?
  const { setChampion } = useSelectedChampionsStore();

  // PE 2/3 - DRY...
  useEffect(() => {
    if (props.selectedChampionRate) setChampion(props.selectedChampionRate);
  }, [props.selectedChampionRate]);

  // PE 2/3 - could have a selectedPlayers on selectedChampionsStore

  const [championDialogIsOpen, setChampionDialogIsOpen] = useState(false);
  const [initialValueChampionDialog, setInitialValueChampionDialog] =
    useState<PlayerChampionDto>(null);

  const { data: playerChampions } = usePlayerChampionsQuery();

  const getChampionsBySkillLevel = (skillLevel: SkillLevelTypes) => {
    if (!props.selectedPlayerId || !playerChampions?.length) {
      return [];
    }

    return playerChampions
      .filter(
        (pChampion) =>
          pChampion.playerId === props.selectedPlayerId &&
          pChampion.skillLevel === skillLevel &&
          pChampion.role === props.role
      )
      .sort((a, b) => b.rate?.avgWin - a.rate?.avgWin);
  };

  const { mutate: deletePChampion } = useDeletePlayerChampionMutation();
  const confirmDeletePChampion = (id: number) => {
    if (confirm("Confirm delete?")) deletePChampion(id);
  };

  const { data: allChampions } = useChampionsQuery();

  // PE 2/3
  const selectChampion = (championId: number) => {
    if (allChampions?.length > 0) {
      const champion = allChampions.find((c) => c.id === championId);

      if (champion) {
        const rateFound = props.roleRates.find(
          (rate) => rate.championName === champion.name
        );
        if (rateFound) props.onSelectChampionRate(rateFound);
        else
          props.onSelectChampionRate(
            getLolRateChampionDto(champion, props.role)
          );
      }
    }
  };

  const handleClickEditChampion = (
    championId: number,
    skillLevel: SkillLevelTypes
  ) => {
    setChampionDialogIsOpen(true);

    const playerChampion = playerChampions.find(
      (pChampion) =>
        pChampion.playerId === props.selectedPlayerId &&
        pChampion.championId === championId
    );

    setInitialValueChampionDialog(
      // PE 1/3 - wtf
      getFilledPlayerChampionDto(
        playerChampion.id,
        props.selectedPlayerId as number,
        championId,
        skillLevel,
        props.role,
        playerChampion.notes
      )
    );
  };

  return (
    <S.Root>
      {props.selectedPlayerId && (
        <S.ColContent>
          <S.ChampionsWrapper>
            <Txt>OP</Txt>
            <S.ChampionImgs>
              {getChampionsBySkillLevel("OP").map((pChampion) => (
                <PlayerChampionImage
                  role={props.role}
                  key={pChampion.id}
                  onClickEditChampion={(championId) =>
                    handleClickEditChampion(championId, "OP")
                  }
                  onClick={selectChampion}
                  onClickDelete={confirmDeletePChampion}
                  pChampion={pChampion}
                />
              ))}
              <IconButton
                size="small"
                style={{ width: 32, height: 32 }}
                onClick={() => {
                  setChampionDialogIsOpen(true);
                  setInitialValueChampionDialog(
                    getEmptyPlayerChampionDto(
                      props.selectedPlayerId as number,
                      null,
                      "OP",
                      props.role
                    )
                  );
                }}
              >
                <AddIcon />
              </IconButton>
            </S.ChampionImgs>
          </S.ChampionsWrapper>

          <S.ChampionsWrapper>
            <Txt>Encourage</Txt>
            <S.ChampionImgs>
              {getChampionsBySkillLevel("Encourage").map((pChampion) => (
                <PlayerChampionImage
                  role={props.role}
                  key={pChampion.id}
                  onClick={selectChampion}
                  onClickEditChampion={(championId) =>
                    handleClickEditChampion(championId, "Encourage")
                  }
                  onClickDelete={confirmDeletePChampion}
                  pChampion={pChampion}
                />
              ))}

              <IconButton
                size="small"
                style={{ width: 32, height: 32 }}
                onClick={() => {
                  setChampionDialogIsOpen(true);
                  setInitialValueChampionDialog(
                    getEmptyPlayerChampionDto(
                      props.selectedPlayerId as number,
                      null,
                      "Backlog",
                      props.role
                    )
                  );
                }}
              >
                <AddIcon />
              </IconButton>
            </S.ChampionImgs>
          </S.ChampionsWrapper>

          <S.ChampionsWrapper>
            <Txt>Backlog</Txt>
            <S.ChampionImgs>
              {getChampionsBySkillLevel("Backlog").map((pChampion) => (
                <PlayerChampionImage
                  role={props.role}
                  key={pChampion.id}
                  onClick={selectChampion}
                  onClickEditChampion={(championId) =>
                    handleClickEditChampion(championId, "Backlog")
                  }
                  onClickDelete={confirmDeletePChampion}
                  pChampion={pChampion}
                />
              ))}

              <IconButton
                size="small"
                style={{ width: 32, height: 32 }}
                onClick={() => {
                  setChampionDialogIsOpen(true);
                  setInitialValueChampionDialog(
                    getEmptyPlayerChampionDto(
                      props.selectedPlayerId as number,
                      null,
                      "Backlog",
                      props.role
                    )
                  );
                }}
              >
                <AddIcon />
              </IconButton>
            </S.ChampionImgs>
          </S.ChampionsWrapper>
        </S.ColContent>
      )}

      <PlayerChampionDialog
        open={championDialogIsOpen}
        initialValue={initialValueChampionDialog}
        onClose={() => setChampionDialogIsOpen(false)}
      />
    </S.Root>
  );
};

export default DraftCol2;
