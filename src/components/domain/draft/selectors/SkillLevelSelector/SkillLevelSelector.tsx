import { MenuItem, Select } from "@material-ui/core";
import React from "react";
import {
  skillLevels,
  SkillLevelTypes,
} from "../../../../../types/domain/draft/SkillLevelTypes";

// PE 2/3
const SkillLevelSelector = (props: {
  selectedLevel: SkillLevelTypes;
  onChange: (level: SkillLevelTypes) => void;
}) => {
  const handleChange = (event: any) => {
    const level = event.target.value as SkillLevelTypes;
    props.onChange(level);
  };

  return (
    <Select
      labelId={`skill-level-selector-label`}
      value={props.selectedLevel}
      onChange={handleChange}
      label="Skill level"
    >
      {skillLevels.map((level) => (
        <MenuItem key={level} value={level}>
          {level}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SkillLevelSelector;
