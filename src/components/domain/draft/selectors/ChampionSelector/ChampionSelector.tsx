import { MenuItem, Select } from "@material-ui/core";
import React from "react";
import { ChampionDto } from "../../../../../types/domain/general/ChampionDto";

// PE 2/3
const ChampionSelector = (props: {
  championOptions: ChampionDto[];
  selectedChampionId: number | "";
  onChange: (championId: number) => void;
}) => {
  const handleChange = (event: any) => {
    const championId = event.target.value as number;
    props.onChange(championId);
  };

  return (
    <Select
      labelId={`champion-selector-label`}
      value={props.selectedChampionId ? props.selectedChampionId : ""}
      onChange={handleChange}
      label="Champion"
    >
      {props.championOptions.map((champion) => (
        <MenuItem
          key={champion.id}
          value={champion.id}
          selected={champion.id === props.selectedChampionId}
        >
          {champion.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default ChampionSelector;
