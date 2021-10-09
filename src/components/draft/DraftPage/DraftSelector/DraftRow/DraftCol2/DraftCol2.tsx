import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useSelectedChampionsStore from "hooks/zustand-stores/domain/draft/useSelectedChampionsStore";
import React, { useEffect, useState } from "react";
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

  const { data: pChampions } = usePlayerChampionsQuery();

  // PE 2/3 - useMemo()
  const getOpChampions = () => {
    if (!props.selectedPlayerId || !pChampions?.length) {
      return [];
    }

    return pChampions.filter(
      (pChampion) =>
        pChampion.playerId === props.selectedPlayerId &&
        pChampion.skillLevel === "OP" &&
        pChampion.role === props.role
    );
  };

  // PE 2/3 - useMemo()
  const getDecentChampions = () => {
    if (!props.selectedPlayerId || !pChampions?.length) {
      return [];
    }

    return pChampions.filter(
      (pChampion) =>
        pChampion.playerId === props.selectedPlayerId &&
        pChampion.skillLevel === "Decent/Practice" &&
        pChampion.role === props.role
    );
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

    const pChampion = pChampions.find(
      (pChampion) =>
        pChampion.playerId === props.selectedPlayerId &&
        pChampion.championId === championId
    );

    setInitialValueChampionDialog(
      getFilledPlayerChampionDto(
        pChampion.id,
        props.selectedPlayerId as number,
        championId,
        skillLevel,
        props.role
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
              {getOpChampions().map((pChampion) => (
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
            <Txt>Decent/Practice</Txt>
            <S.ChampionImgs>
              {getDecentChampions().map((pChampion) => (
                <PlayerChampionImage
                  role={props.role}
                  key={pChampion.id}
                  onClick={selectChampion}
                  onClickEditChampion={(championId) =>
                    handleClickEditChampion(championId, "Decent/Practice")
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
                      "Decent/Practice",
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
