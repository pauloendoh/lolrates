import { Autocomplete } from "@material-ui/lab";
import React from "react";
import {
  skillLevels,
  SkillLevelTypes
} from "../../../../../types/domain/draft/SkillLevelTypes";
import FlexVCenter from "../../../../Shared/Flexboxes/FlexVCenter";
import MyTextField from "../../../../Shared/MyInputs/MyTextField";

// PE 2/3
const SkillLevelSelector = (props: {
  selectedLevel: SkillLevelTypes;
  onChange: (level: SkillLevelTypes) => void;
}) => {
  return (
    <Autocomplete
      value={props.selectedLevel}
      options={[...skillLevels]}
      renderOption={(skillLevel) => <FlexVCenter>{skillLevel}</FlexVCenter>}
      getOptionLabel={(skillLevel) => skillLevel}
      renderInput={(params) => (
        <MyTextField
          InputProps={{ id: "skill-level-selector" }}
          label="Skill level"
          style={{width: 111}}
          {...params}
          size="small"
          
        />
      )}
      onChange={(e, value) => {
        const level = value as SkillLevelTypes;
        props.onChange(level);
      }}
    />
  );
};

export default SkillLevelSelector;
