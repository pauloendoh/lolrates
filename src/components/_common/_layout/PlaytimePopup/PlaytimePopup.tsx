import { CgExternal } from "react-icons/cg";

import { usePlaytimeQuery } from "@/hooks/react-query/domain/rates/usePlaytimeQuery";
import useAramHelperStore from "@/hooks/zustand-stores/domain/aram-helper/useAramHelperStore";
import { localStorageKeys } from "@/utils/consts/localStorageKeys";
import { Box, CircularProgress, Typography } from "@material-ui/core";
import { useEffect, useMemo } from "react";
import FlexCol from "../../flexboxes/FlexCol";

type Props = {};

const PlaytimePopup = ({ ...props }: Props) => {
  const { summonerName, setSummonerName } = useAramHelperStore();

  useEffect(() => {
    const savedValue = localStorage.getItem(localStorageKeys.summonerName);
    if (savedValue) {
      setSummonerName(savedValue);
    }
  }, []);

  const { data: playtime, isLoading } = usePlaytimeQuery(summonerName);

  const playtimeLabel = useMemo(() => {
    if (!playtime) return "";
    // 12h 30m
    const hours = Math.floor(playtime.playedMinutes / 60);
    const minutes = Math.floor(playtime.playedMinutes % 60);

    return `${hours}h ${minutes}m`;
  }, [playtime]);

  if (!summonerName) return null;

  return (
    <Box
      className="PlaytimePopup"
      sx={{
        position: "fixed",
        bottom: 8,
        right: 8,
        bgcolor: "orange",
        borderRadius: 4,
        padding: "4px 8px",
      }}
    >
      <FlexCol>
        <Typography>{summonerName}</Typography>
        {isLoading && <CircularProgress size={12} />}

        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          {playtimeLabel}
          <a
            href={`https://www.op.gg/summoners/br/${summonerName}`}
            target="_blank"
            rel="noreferrer"
            style={{
              marginLeft: 4,
              bottom: 2,
              position: "relative",
            }}
          >
            <CgExternal size={18} />
          </a>
        </span>
      </FlexCol>
    </Box>
  );
};

export default PlaytimePopup;
