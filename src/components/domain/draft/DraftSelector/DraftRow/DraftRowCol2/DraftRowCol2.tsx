import { Box, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect, useState } from "react";
import myColors from "../../../../../../consts/myColors";
import useDeletePlayerChampionMutation from "../../../../../../hooks/react-query/domain/draft/playerChampion/useDeletePlayerChampionMutation";
import useChampionsQuery from "../../../../../../hooks/react-query/domain/draft/useChampionsQuery";
import usePlayerChampionsQuery from "../../../../../../hooks/react-query/domain/draft/playerChampion/usePlayerChampionsQuery";
import useSelectedChampionsStore from "../../../../../../hooks/stores/domain/draft/useSelectedChampionsStore";
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
import Flex from "../../../../../UI/Flexboxes/Flex";
import Txt from "../../../../../UI/Text/Txt";
import PlayerChampionDialog from "../../../dialogs/PlayerChampionDialog/PlayerChampionDialog";
import PlayerChampionImage from "../PlayerChampionImage/PlayerChampionImage";

const DraftRowCol2 = (props: {
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
        else props.onSelectChampionRate(getLolRateChampionDto(champion, props.role));
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
    <Box
      minWidth={216}
      minHeight={128}
      px={1}
      borderRight={myColors.border}
      borderLeft={myColors.border}
    >
      {props.selectedPlayerId && (
        <React.Fragment>
          <Box mb={1}>
            <Txt>OP</Txt>
            <Flex flexWrap="wrap" style={{ gap: 8 }}>
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
            </Flex>
          </Box>
          <Box mt={2} mb={1}>
            <Txt>Decent/Practice</Txt>
            <Flex flexWrap="wrap" style={{ gap: 8 }}>
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
            </Flex>
          </Box>
          <PlayerChampionDialog
            open={championDialogIsOpen}
            initialValue={initialValueChampionDialog}
            onClose={() => setChampionDialogIsOpen(false)}
          />
        </React.Fragment>
      )}
    </Box>
  );
};

export default DraftRowCol2;
