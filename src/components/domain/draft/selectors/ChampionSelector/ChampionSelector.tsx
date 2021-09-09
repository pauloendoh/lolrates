import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { ChampionDto } from "../../../../../types/domain/draft/ChampionDto";
import FlexVCenter from "../../../../UI/Flexboxes/FlexVCenter";
import MyTextField from "../../../../UI/MyInputs/MyTextField";

// PE 2/3
const ChampionSelector = (props: {
  championOptions: ChampionDto[];
  selectedChampionId: number | "";
  onChange: (championId: number) => void;
  width: string;
}) => {

  // PE 2/3 - shouldn't need this if props.value was correct '-'
  const [selectedChampion, setSelectedChampion] = useState<ChampionDto>(null);

  useEffect(() => {
    if (props.selectedChampionId) {
      setSelectedChampion(
        props.championOptions.find((p) => p.id === props.selectedChampionId)
      );
    } else setSelectedChampion(null);
  }, [props.selectedChampionId]);

  return (
    <Autocomplete
      value={selectedChampion}
      options={[...props.championOptions]}
      renderOption={(option) => <FlexVCenter>{option.name}</FlexVCenter>}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <MyTextField
          InputProps={{ id: "champion-selector" }}
          label="Champion name"
          style={{ width: props.width }}
          {...params}
          size="small"
        />
      )}
      onChange={(e, value) => {
        const champion = value as ChampionDto;

        props.onChange(champion ? champion.id : null);
      }}
    />
  );
};

export default ChampionSelector;
