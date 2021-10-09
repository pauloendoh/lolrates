import { Autocomplete } from "@material-ui/lab";
import React from "react";
import {
  ChampionRoleType,
  roles,
} from "../../../../../../../../types/domain/rates/ChampionRoleType";
import MyTextField from "../../../../../../../_common/inputs/MyTextField";

// PE 2/3
const RoleSelector = (props: {
  selectedRole: ChampionRoleType | "";
  onChange: (championRole: ChampionRoleType) => void;
}) => {
  return (
    <Autocomplete
      value={props.selectedRole}
      options={[...roles]}
      renderOption={(role) => <span>{role}</span>}
      getOptionLabel={(role) => role}
      renderInput={(params) => (
        <MyTextField
          InputProps={{ id: "role-selector" }}
          label="Role"
          style={{ width: 115 }}
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
