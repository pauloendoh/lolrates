import { Autocomplete } from "@material-ui/lab";
import React from "react";
import {
  ChampionRoleType,
  roles
} from "../../../../../types/LolRate/ChampionRoleType";
import FlexVCenter from "../../../../Shared/Flexboxes/FlexVCenter";
import MyTextField from "../../../../Shared/MyInputs/MyTextField";

// PE 2/3
const RoleSelector = (props: {
  selectedRole: ChampionRoleType | "";
  onChange: (championRole: ChampionRoleType) => void;
}) => {
  return (
    <Autocomplete
      value={props.selectedRole}
      options={[...roles]}
      renderOption={(role) => <FlexVCenter>{role}</FlexVCenter>}
      getOptionLabel={(role) => role}
      renderInput={(params) => (
        <MyTextField
          InputProps={{ id: "role-selector" }}
          label="Role"
          style={{width: 115}}
          {...params}
          size="small"
        />
      )}
      onChange={(e, value) => {
        const role = value as ChampionRoleType;
        props.onChange(role);
      }}
    />
  );
};

export default RoleSelector;
