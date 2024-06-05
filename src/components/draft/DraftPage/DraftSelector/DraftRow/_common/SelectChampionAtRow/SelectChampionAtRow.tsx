import { Autocomplete } from "@material-ui/lab";
import { forwardRef, useEffect, useState } from "react";
import { ChampionDto } from "../../../../../../../types/domain/draft/ChampionDto";
import MyTextField from "../../../../../../_common/inputs/MyTextField";

type Props = {
  championOptions: ChampionDto[];
  selectedChampionId: number | "";
  onChange: (championId: number) => void;
  width: string;
};

const SelectChampionAtRow = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
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
        renderOption={(option) => <span>{option.name}</span>}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <MyTextField
            InputProps={{ id: "champion-selector" }}
            label="Champion name"
            style={{ width: props.width }}
            {...params}
            size="small"
            inputRef={ref}
          />
        )}
        onChange={(e, value) => {
          const champion = value as ChampionDto;

          props.onChange(champion ? champion.id : null);
        }}
      />
    );
  }
);

export default SelectChampionAtRow;
