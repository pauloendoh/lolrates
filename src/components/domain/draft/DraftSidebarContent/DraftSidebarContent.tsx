import { Box, IconButton, ListItem, ListItemText } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useCallback, useState } from "react";
import usePlayersQuery from "../../../../hooks/react-query/auth/usePlayersQuery";
import {
  getEmptyPlayerDto,
  PlayerDto
} from "../../../../types/domain/draft/PlayerDto";
import FlexVCenter from "../../../Shared/Flexboxes/FlexVCenter";
import PlayerNameDialog from "../dialogs/PlayerNameDialog/PlayerNameDialog";

const DraftSidebarContent = () => {
  const [openPlayerDialog, setOpenPlayerDialog] = useState(false);
  const [playerDialog, setPlayerDialog] = useState<PlayerDto>(null);

  const { allPlayers } = usePlayersQuery();
  const getPlayersAlphabetically = useCallback(() => {
    if (allPlayers?.length > 0)
      return allPlayers.sort((a, b) => a.name.localeCompare(b.name));
    return [];
  }, [allPlayers]);

  return (
    <React.Fragment>
      <ListItem>
        <ListItemText>
          <FlexVCenter justifyContent="space-between">
            <Box>Players</Box>
            <IconButton
              size="small"
              onClick={() => {
                setPlayerDialog(getEmptyPlayerDto());
                setOpenPlayerDialog(true);
              }}
            >
              <AddIcon />
            </IconButton>
          </FlexVCenter>

          <PlayerNameDialog
            open={openPlayerDialog}
            initialValue={playerDialog}
            onClose={() => setOpenPlayerDialog(false)}
          />
        </ListItemText>
      </ListItem>
      {getPlayersAlphabetically()?.map((player) => (
        <ListItem key={player.id}>
          <ListItemText>{player.name}</ListItemText>
        </ListItem>
      ))}
    </React.Fragment>
  );
};

export default DraftSidebarContent;
