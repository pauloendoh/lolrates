import { MenuItem, Select } from "@material-ui/core";
import React from "react";
import { PlayerDto } from "../../../../../types/domain/draft/PlayerDto";
import { ChampionRoleType } from "../../../../../types/LolRate/ChampionRoleType";

type FilterByType = "All" | "Over 51% WR";

// PE 2/3
const PlayerSelector = (props: {
  playerOptions: PlayerDto[];
  selectedPlayerId: number | '';
  onChange: (playerId: number) => void;
  role: ChampionRoleType;
}) => {
  const handleChange = (event: any) => {
    const playerId = event.target.value as number;
      props.onChange(playerId);
  };

  return (
    <Select
      labelId={`input-label-${props.role}`}
      value={props.selectedPlayerId}
      onChange={handleChange}
      label="Sort by"
    >

      {props.playerOptions.map((player) => (
        <MenuItem key={player.id} value={player.id} selected={player.id === props.selectedPlayerId}>
          {player.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default PlayerSelector;
