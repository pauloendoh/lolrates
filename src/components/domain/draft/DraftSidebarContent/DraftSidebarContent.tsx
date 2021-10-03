import Txt from "@/components/UI/Text/Txt";
import { IconButton, ListItem, ListItemText } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useCallback, useState } from "react";
import usePlayersQuery from "../../../../hooks/react-query/domain/draft/usePlayersQuery";
import {
  getEmptyPlayerDto,
  PlayerDto
} from "../../../../types/domain/draft/PlayerDto";
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
      <ListItem button style={{ justifyContent: "space-between" }}>
        <Txt>Players</Txt>
        <IconButton
          size="small"
          onClick={() => {
            setPlayerDialog(getEmptyPlayerDto());
            setOpenPlayerDialog(true);
          }}
        >
          <AddIcon />
        </IconButton>
      </ListItem>
      
      {getPlayersAlphabetically()?.map((player) => (
        <ListItem key={player.id}>
          <ListItemText>{player.name}</ListItemText>
        </ListItem>
      ))}

      <PlayerNameDialog
        open={openPlayerDialog}
        initialValue={playerDialog}
        onClose={() => setOpenPlayerDialog(false)}
      />
    </React.Fragment>
  );
};

export default DraftSidebarContent;
