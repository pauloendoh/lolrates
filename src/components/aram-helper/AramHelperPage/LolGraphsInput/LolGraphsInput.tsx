import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter";
import MyTextField from "@/components/_common/inputs/MyTextField";
import { lolGraphsUrlIsValid } from "@/hooks/react-query/domain/aram-helper/useAramChampionsWinRatesQuery";
import useAramHelperStore from "@/hooks/zustand-stores/domain/aram-helper/useAramHelperStore";
import { Button } from "@material-ui/core";
import { useEffect } from "react";

type Props = {};

const LolGraphsInput = ({ ...props }: Props) => {
  const { lolgraphsUrl, setLolgraphsUrl } = useAramHelperStore();

  useEffect(() => {
    const savedValue = localStorage.getItem("lolGraphsInput");
    if (savedValue) {
      setLolgraphsUrl(savedValue);
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
        value={lolgraphsUrl}
        onChange={(e) => {
          setLolgraphsUrl(e.target.value);
        }}
      />
      <Button
        variant="contained"
        color="primary"
        style={{
          height: 38.4,
        }}
        onClick={() => {
          localStorage.setItem("lolGraphsInput", lolgraphsUrl);
        }}
      >
        Save
      </Button>
      {!lolGraphsUrlIsValid(lolgraphsUrl) && `Invalid url.`}
    </FlexVCenter>
  );
};

export default LolGraphsInput;
