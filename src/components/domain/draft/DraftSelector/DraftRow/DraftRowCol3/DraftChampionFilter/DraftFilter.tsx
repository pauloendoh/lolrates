import { ChampionRoleType } from "@/types/domain/rates/ChampionRoleType";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React from "react";
type FilterBy = "All" | "Over 51% WR";

const DraftChampionFilter = (props: {
  championRole: ChampionRoleType;
  sortBy: FilterBy;
  setSortBy: (newSortBy: FilterBy) => void;
}) => {
  return (
    <FormControl size="small" variant="outlined">
      <InputLabel id={`input-label-${props.championRole}`}>Show</InputLabel>
      <Select
        labelId={`input-label-${props.championRole}`}
        value={props.sortBy}
        onChange={(e) => props.setSortBy(e.target.value as any)}
        label="Sort by"
      >
        <MenuItem value={"All" as FilterBy}>All</MenuItem>
        <MenuItem value={"Over 51% WR" as FilterBy}>Over 51%</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DraftChampionFilter;
