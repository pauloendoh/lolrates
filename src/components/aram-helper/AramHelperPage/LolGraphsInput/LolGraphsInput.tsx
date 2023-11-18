import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter";
import MyTextField from "@/components/_common/inputs/MyTextField";
import useAramHelperStore from "@/hooks/zustand-stores/domain/aram-helper/useAramHelperStore";
import { localStorageKeys } from "@/utils/consts/localStorageKeys";
import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";

type Props = {};

const LolGraphsInput = ({ ...props }: Props) => {
  const { summonerName, setSummonerName } = useAramHelperStore();

  const [value, setValue] = useState("");

  useEffect(() => {
    const savedValue = localStorage.getItem(localStorageKeys.summonerName);
    if (savedValue) {
      setSummonerName(savedValue);
      setValue(savedValue);
    }
  }, []);

  return (
    <FlexVCenter
      className="LolGraphsInput"
      style={{
        gap: 8,
      }}
    >
      <MyTextField
        label="Summoner name"
        size="small"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <Button
        variant="contained"
        color="primary"
        style={{
          height: 38.4,
        }}
        disabled={value.trim().length === 0}
        onClick={() => {
          localStorage.setItem(localStorageKeys.summonerName, value);
          setSummonerName(value);
        }}
      >
        Save
      </Button>
    </FlexVCenter>
  );
};

export default LolGraphsInput;
