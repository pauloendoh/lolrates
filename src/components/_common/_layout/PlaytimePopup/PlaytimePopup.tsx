import { usePlaytimeQuery } from "@/hooks/react-query/domain/rates/usePlaytimeQuery";
import useAramHelperStore from "@/hooks/zustand-stores/domain/aram-helper/useAramHelperStore";
import { localStorageKeys } from "@/utils/consts/localStorageKeys";
import { useLocalStorage } from "@mantine/hooks";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { useEffect, useMemo, useState } from "react";
import FlexCol from "../../flexboxes/FlexCol";
import FlexVCenter from "../../flexboxes/FlexVCenter";
import MyTextField from "../../inputs/MyTextField";

type Props = {};

const PlaytimePopup = ({ ...props }: Props) => {
  const { summonerName, setSummonerName } = useAramHelperStore();

  useEffect(() => {
    const savedValue = localStorage.getItem(localStorageKeys.summonerName);
    if (savedValue) {
      setSummonerName(savedValue);
    }
  }, []);

  const [startingWeekday, setStartingWeekday] = useLocalStorage<number>({
    key: localStorageKeys.startingWeekday,
    defaultValue: 1,
  });

  const { data: playtime, isLoading } = usePlaytimeQuery(
    summonerName,
    startingWeekday
  );

  const [maxHoursAllowed, setMaxHoursAllowed] = useLocalStorage<number>({
    key: localStorageKeys.maxHoursAllowed,
    defaultValue: 0,
  });

  const [maxMinutesAllowed, setMaxMinutesAllowed] = useLocalStorage<number>({
    key: localStorageKeys.maxMinutesAllowed,
    defaultValue: 0,
  });

  const [extraHours, setExtraHours] = useLocalStorage<number>({
    key: localStorageKeys.extraHours,
    defaultValue: 0,
  });

  const [extraMinutes, setExtraMinutes] = useLocalStorage<number>({
    key: localStorageKeys.extraMinutes,
    defaultValue: 0,
  });

  const originalPlaytimeLabel = useMemo(() => {
    if (!playtime) return "";
    // 12h 30m

    const totalMinutes = playtime.playedMinutes;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);

    return `${hours}h ${minutes}m`;
  }, [playtime]);

  const finalPlaytimeLabel = useMemo(() => {
    if (!playtime) return "";
    // 12h 30m

    const totalMinutes =
      playtime.playedMinutes + extraMinutes + extraHours * 60;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);

    return `Played ${hours}h ${minutes}m`;
  }, [playtime, extraMinutes]);

  const minutesPlayed = useMemo(() => {
    if (!playtime) return 0;
    return playtime.playedMinutes + extraMinutes + extraHours * 60;
  }, [playtime?.playedMinutes, extraMinutes, extraHours]);

  const remainingPlaytimeLabel = useMemo(() => {
    if (!playtime) return "";
    // 12h 30m

    const _maxMinutesAllowed = 60 * maxHoursAllowed + maxMinutesAllowed;
    const remainingMinutes = _maxMinutesAllowed - minutesPlayed;

    const hours = remainingMinutes / 60;
    const finalHours = hours > 0 ? Math.floor(hours) : Math.ceil(hours);

    const minutes = remainingMinutes % 60;
    const finalMinutes = minutes > 0 ? Math.floor(minutes) : Math.ceil(minutes);

    return `Remaining ${finalHours}h ${finalMinutes}m`;
  }, [playtime, maxHoursAllowed, maxMinutesAllowed]);

  const hasPassedLimit = useMemo(() => {
    const totalMinutes =
      (playtime?.playedMinutes || 0) + extraMinutes + extraHours * 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);

    if (hours > maxHoursAllowed) return true;
    if (hours === maxHoursAllowed && minutes > maxMinutesAllowed) return true;

    return false;
  }, [playtime, extraHours, extraMinutes, maxHoursAllowed, maxMinutesAllowed]);

  const [modalOpen, setModalOpen] = useState(false);

  const resetInLabel = useMemo(() => {
    const today = new Date().getDay();

    // Eg:
    // Resets in 2 days
    // Resets in 7 days
    // Resets tomorrow

    if (today === startingWeekday - 1) {
      return "Resets tomorrow";
    }

    if (today === startingWeekday) {
      return "Resets in 7 days";
    }

    if (today < startingWeekday) {
      return `Resets in ${startingWeekday - today} days`;
    }

    if (today > startingWeekday) {
      return `Resets in ${7 - today + startingWeekday} days`;
    }

    return "Resets in 7 days";
  }, [startingWeekday]);

  if (!summonerName) return null;

  return (
    <>
      <Box
        className="PlaytimePopup"
        sx={{
          position: "fixed",
          bottom: 8,
          right: 8,
          bgcolor: hasPassedLimit ? "red" : "green",
          borderRadius: 4,
          padding: "4px 8px",
        }}
        style={{
          cursor: "pointer",
        }}
        onClick={() => setModalOpen(true)}
      >
        <FlexCol>
          <Typography>{summonerName}</Typography>

          <span>{resetInLabel}</span>
          <br />

          {isLoading && <Typography>Loading...</Typography>}

          <span>{finalPlaytimeLabel}</span>
          <b>{remainingPlaytimeLabel}</b>
        </FlexCol>
      </Box>

      <Dialog
        onClose={() => setModalOpen(false)}
        open={modalOpen}
        maxWidth="xs"
      >
        <DialogTitle>
          <div>Time limit per week</div>
          <div
            style={{
              marginTop: 16,
            }}
          >
            <FormControl size="small" variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-label">Resets on</InputLabel>
              <Select
                label="Resets on"
                value={startingWeekday}
                onChange={(e) => {
                  const num = Number(e.target.value);
                  if (isNaN(num)) return;
                  setStartingWeekday(num);
                }}
              >
                <MenuItem value={1}>Monday</MenuItem>
                <MenuItem value={2}>Tuesday</MenuItem>
                <MenuItem value={3}>Wednesday</MenuItem>
                <MenuItem value={4}>Thursday</MenuItem>
                <MenuItem value={5}>Friday</MenuItem>
                <MenuItem value={6}>Saturday</MenuItem>
                <MenuItem value={7}>Sunday</MenuItem>
              </Select>
            </FormControl>
          </div>
        </DialogTitle>

        <DialogContent>
          <FlexVCenter
            style={{
              gap: 16,
            }}
          >
            <MyTextField
              label="Max hours"
              value={maxHoursAllowed}
              onChange={(e) => {
                const num = Number(e.target.value);
                if (isNaN(num)) return;
                setMaxHoursAllowed(num);
              }}
              style={{
                width: 80,
              }}
            />

            <MyTextField
              label="Max minutes"
              value={maxMinutesAllowed}
              onChange={(e) => {
                const num = Number(e.target.value);
                if (isNaN(num)) return;
                setMaxMinutesAllowed(num);
              }}
              style={{
                width: 100,
              }}
            />
          </FlexVCenter>

          <Divider
            style={{
              margin: "16px 0",
            }}
          />
          <FlexVCenter
            style={{
              gap: 16,
            }}
          >
            <MyTextField
              label="Extra hours"
              value={extraHours}
              onChange={(e) => {
                const num = Number(e.target.value);
                if (isNaN(num)) return;
                setExtraHours(num);
              }}
              style={{
                width: 80,
              }}
            />

            <MyTextField
              label="Extra minutes"
              value={extraMinutes}
              onChange={(e) => {
                const num = Number(e.target.value);
                if (isNaN(num)) return;
                setExtraMinutes(num);
              }}
              style={{
                width: 100,
              }}
            />
          </FlexVCenter>

          <FlexVCenter>
            <Typography
              style={{
                marginTop: 16,
              }}
            >
              <a
                href={`https://www.op.gg/summoners/br/${summonerName}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "underline",
                }}
              >
                {originalPlaytimeLabel}
              </a>{" "}
              + {extraHours}h {extraMinutes}m ={" "}
              <span
                style={{
                  color: hasPassedLimit ? "red" : "green",
                }}
              >
                {finalPlaytimeLabel}
              </span>
            </Typography>
          </FlexVCenter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PlaytimePopup;
