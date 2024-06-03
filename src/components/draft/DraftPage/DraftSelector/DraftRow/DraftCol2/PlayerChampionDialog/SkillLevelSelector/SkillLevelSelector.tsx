import { Autocomplete } from "@material-ui/lab";
import {
  skillLevels,
  SkillLevelTypes,
} from "../../../../../../../../types/domain/draft/SkillLevelTypes";
import MyTextField from "../../../../../../../_common/inputs/MyTextField";

// PE 2/3
const SkillLevelSelector = (props: {
  selectedLevel: SkillLevelTypes;
  onChange: (level: SkillLevelTypes) => void;
}) => {
  return (
    <Autocomplete
      fullWidth
      value={props.selectedLevel}
      options={[...skillLevels]}
      renderOption={(skillLevel) => skillLevel}
      getOptionLabel={(skillLevel) => skillLevel}
      renderInput={(params) => (
        <MyTextField
          InputProps={{ id: "skill-level-selector" }}
          label="Skill level"
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
