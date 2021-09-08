import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { PlayerDto } from "../../../../../types/domain/draft/PlayerDto";
import { ChampionRoleType } from "../../../../../types/LolRate/ChampionRoleType";
import FlexVCenter from "../../../../Shared/Flexboxes/FlexVCenter";
import MyTextField from "../../../../Shared/MyInputs/MyTextField";

// PE 2/3
const PlayerSelector = (props: {
  playerOptions: PlayerDto[];
  selectedPlayerId: number | "";
  onChange: (playerId: number) => void;
  role: ChampionRoleType;
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerDto>(null);

  useEffect(() => {
    if (props.selectedPlayerId) {
      setSelectedPlayer(
        props.playerOptions.find((p) => p.id === props.selectedPlayerId)
      );
    } else setSelectedPlayer(null);
  }, [props.selectedPlayerId]);

  return (
    <>
      <Autocomplete
        value={selectedPlayer}
        options={[...props.playerOptions]}
        renderOption={(option) => <FlexVCenter>{option.name}</FlexVCenter>}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <MyTextField
            InputProps={{ id: "player-selector" }}
            label="Player name"
            {...params}
            size="small"
          />
        )}
        onChange={(e, value) => {
          const player = value as PlayerDto;
          props.onChange(player ? player.id : null);
        }}
      />
    </>
  );
};

export default PlayerSelector;
