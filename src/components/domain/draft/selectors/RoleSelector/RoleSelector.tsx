import { MenuItem, Select } from "@material-ui/core";
import React from "react";
import {
  ChampionRoleType,
  roles
} from "../../../../../types/LolRate/ChampionRoleType";

// PE 2/3
const RoleSelector = (props: {
  selectedRole: ChampionRoleType | "";
  onChange: (championRole: ChampionRoleType) => void;
}) => {
  const handleChange = (event: any) => {
    const role = event.target.value as ChampionRoleType;
    props.onChange(role);
  };

  return (
    <Select
      labelId={`role-selector-label`}
      value={props.selectedRole}
      onChange={handleChange}
      label="Champion"
    >
      {roles.map((role) => (
        <MenuItem key={role} value={role}>
          {role}
        </MenuItem>
      ))}
    </Select>
  );
};

export default RoleSelector;
