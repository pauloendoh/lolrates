import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  useTheme,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
import { useEffect } from "react";
import myColors from "../../../../../consts/myColors";
import useDeletePlayerChampionMutation from "../../../../../hooks/domain/playerChampion/useDeletePlayerChampionMutation";
import useChampionsQuery from "../../../../../hooks/react-query/auth/useChampionsQuery";
import usePlayersQuery from "../../../../../hooks/react-query/auth/usePlayersQuery";
import usePlayerChampionsQuery from "../../../../../hooks/react-query/queries/usePlayerChampionsQuery";
import useSelectedChampionsStore from "../../../../../hooks/stores/domain/draft/useSelectedChampionsStore";
import {
  getEmptyPlayerChampionDto,
  PlayerChampionDto,
} from "../../../../../types/domain/draft/PlayerChampionDto";
import { ChampionRoleType } from "../../../../../types/LolRate/ChampionRoleType";
import {
  getLolRateDto,
  ILolRateChampion,
} from "../../../../../types/LolRate/ILolRateChampion";
import { formatWinPickRate } from "../../../../../utils/domain/rates/formatWinPickRate";
import Flex from "../../../../Shared/Flexboxes/Flex";
import FlexVCenter from "../../../../Shared/Flexboxes/FlexVCenter";
import Txt from "../../../../Shared/Text/Txt";
import ChampionTooltipTitle from "../../../rates/ChampionTooltipTitle";
import PlayerChampionDialog from "../../dialogs/PlayerChampionDialog/PlayerChampionDialog";
import PlayerSelector from "../../selectors/PlayerSelector/PlayerSelector";
import PlayerChampionImage from "./PlayerChampionImage/PlayerChampionImage";

type FilterByType = "All" | "Over 51% WR";

// PE 2/3
const DraftSelectorRow = (props: {
  role: ChampionRoleType;
  roleRates: ILolRateChampion[];
  hasBorderBottom: boolean;
  sortBy: FilterByType;
  setSortBy: (newSortBy: FilterByType) => void;
}) => {
  const [selectedChampion, setSelectedChampion] =
    useState<ILolRateChampion>(null);

  const { setChampion } = useSelectedChampionsStore();
  
  useEffect(() => {
    if (selectedChampion) setChampion(selectedChampion);
    // TODO: else: removeChampion
  }, [selectedChampion]);

  // Returns rates by role, over 51% win rate and in descending order
  const getBestChampions = () => {
    if (props.sortBy === "All")
      return [...props.roleRates].sort((a, b) => b.avgAvg - a.avgAvg);
    else {
      const ratesOver51 = [...props.roleRates].filter((r) => r.avgWin >= 51);
      return ratesOver51.sort((a, b) => b.avgAvg - a.avgAvg);
    }
  };

  const theme = useTheme();
  const getBorder = (avgWin: number) => {
    if (avgWin >= 51) return `2px solid ${theme.palette.primary.main}`;
    if (avgWin >= 49) return `2px solid ${myColors.ratingYellow[5]}`;
    return `2px solid ${theme.palette.error.main}`;
  };

  const { data: players } = usePlayersQuery();

  const [selectedPlayerId, setSelectedPlayerId] = useState<number | "">("");

  const [championDialogIsOpen, setChampionDialogIsOpen] = useState(false);
  const [initialValueChampionDialog, setInitialValueChampionDialog] =
    useState<PlayerChampionDto>(null);

  const { data: pChampions } = usePlayerChampionsQuery();

  const getOpChampions = () => {
    if (!selectedPlayerId || !pChampions?.length) {
      return [];
    }

    return pChampions.filter(
      (pChampion) =>
        pChampion.playerId === selectedPlayerId &&
        pChampion.skillLevel === "OP" &&
        pChampion.role === props.role
    );
  };

  const getDecentChampions = () => {
    if (!selectedPlayerId || !pChampions?.length) {
      return [];
    }

    return pChampions.filter(
      (pChampion) =>
        pChampion.playerId === selectedPlayerId &&
        pChampion.skillLevel === "Decent/Practice" &&
        pChampion.role === props.role
    );
  };

  const { mutate: deletePChampion } = useDeletePlayerChampionMutation();

  const confirmDeletePChampion = (id: number) => {
    if (confirm("Confirm delete?")) deletePChampion(id);
  };

  const { data: allChampions } = useChampionsQuery();

  const handleSelectPlayerChampion = (championId: number) => {
    if (allChampions?.length > 0) {
      const champion = allChampions.find((c) => c.id === championId);
      const rateFound = props.roleRates.find(
        (rate) => rate.championName === champion.name
      );
      if (rateFound) setSelectedChampion(rateFound);
      else setSelectedChampion(getLolRateDto(champion, props.role));
    }
  };

  return (
    <Box
      pt={1}
      key={props.role}
      borderBottom={
        props.hasBorderBottom ? `1px solid ${myColors.border}` : null
      }
    >
      <Flex>
        <Box minWidth={216} minHeight={128}>
          {!!selectedChampion && (
            <Flex>
              <img
                src={selectedChampion.iconUrl}
                style={{
                  height: 48,
                  borderRadius: 100,
                  cursor: "pointer",
                }}
              />

              <Box ml={1}>
                <Box>
                  <Txt>{selectedChampion.championName}</Txt>
                </Box>
                <Box>
                  <Txt>
                    {formatWinPickRate(selectedChampion.avgWin)} win ·{" "}
                    {formatWinPickRate(selectedChampion.avgPick)} pick
                  </Txt>
                </Box>
              </Box>
            </Flex>
          )}

          {players?.length > 0 && (
            <Box>
              <PlayerSelector
                role={props.role}
                playerOptions={players}
                selectedPlayerId={selectedPlayerId}
                onChange={setSelectedPlayerId}
              />
            </Box>
          )}
        </Box>

        <Box minWidth={216} minHeight={128}>
          {selectedPlayerId && (
            <React.Fragment>
              <Box mb={1}>
                <Txt>OP</Txt>
                <Flex flexWrap="wrap">
                  {getOpChampions().map((pChampion) => (
                    <PlayerChampionImage
                      key={pChampion.id}
                      onClick={handleSelectPlayerChampion}
                      onClickDelete={confirmDeletePChampion}
                      pChampion={pChampion}
                    />
                  ))}
                  <IconButton
                    size="small"
                    onClick={() => {
                      setChampionDialogIsOpen(true);
                      setInitialValueChampionDialog(
                        getEmptyPlayerChampionDto(
                          selectedPlayerId,
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
                <Flex flexWrap="wrap">
                  {getDecentChampions().map((pChampion) => (
                    <PlayerChampionImage
                      key={pChampion.id}
                      onClick={handleSelectPlayerChampion}
                      onClickDelete={confirmDeletePChampion}
                      pChampion={pChampion}
                    />
                  ))}

                  <IconButton
                    size="small"
                    onClick={() => {
                      setChampionDialogIsOpen(true);
                      setInitialValueChampionDialog(
                        getEmptyPlayerChampionDto(
                          selectedPlayerId,
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

        <Box flexGrow={1}>
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
            {getBestChampions().map((championRate, i) => (
              <Box mr={0.5} mb={1} key={i}>
                <Tooltip
                  enterDelay={500}
                  enterNextDelay={500}
                  interactive
                  title={<ChampionTooltipTitle rate={championRate} />}
                >
                  <img
                    onClick={() => setSelectedChampion(championRate)}
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
  );
};

export default DraftSelectorRow;
