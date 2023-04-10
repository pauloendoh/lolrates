import Flex from "@/components/_common/flexboxes/Flex";
import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter";
import MyTextField from "@/components/_common/inputs/MyTextField";
import {
  buildUserAramChampionDto,
  UserAramChampionDto,
} from "@/hooks/react-query/domain/aram-helper/types/UserAramChampionDto";
import { useMyAramChampionsQuery } from "@/hooks/react-query/domain/aram-helper/useMyAramChampionsQuery";
import useSaveAramChampionMutation from "@/hooks/react-query/domain/aram-helper/useSaveAramChampionMutation";
import useChampionsQuery from "@/hooks/react-query/domain/draft/useChampionsQuery";
import useDebounce from "@/hooks/useDebounce";
import useAramHelperStore from "@/hooks/zustand-stores/domain/aram-helper/useAramHelperStore";
import { Box, Paper, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

type Props = {};

const SelectedChampionPaper = (props: Props) => {
  const { data: champions } = useChampionsQuery();
  const { selectedChampion } = useAramHelperStore();

  const [localChampion, setLocalChampion] = useState<UserAramChampionDto>();

  const { data: myAramChampions } = useMyAramChampionsQuery();

  useEffect(() => {
    if (selectedChampion && myAramChampions && champions) {
      const champion = champions.find(
        (x) => x.name === selectedChampion.championName
      );
      if (!champion) return;

      const myAramChampion = myAramChampions.find(
        (x) => x.championId === champion.id
      );
      if (myAramChampion) {
        setLocalChampion(myAramChampion);
        return;
      }

      const userAramChampionDto = buildUserAramChampionDto({
        championId: champion.id,
      });

      setLocalChampion(userAramChampionDto);
      return;
    }

    setLocalChampion(buildUserAramChampionDto());
  }, [selectedChampion, myAramChampions, champions]);

  const { mutate } = useSaveAramChampionMutation();

  const onSubmit = (data: UserAramChampionDto) => {
    mutate(data);
  };

  const debouncedChampion = useDebounce(localChampion, 500);

  useEffect(() => {
    if (!debouncedChampion?.championId) return;

    mutate(debouncedChampion);
  }, [debouncedChampion]);

  if (!selectedChampion) return null;
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <FlexVCenter style={{ gap: 8 }}>
            <img
              src={selectedChampion.iconUrl}
              alt={selectedChampion.championName}
              style={{ width: 40, height: 40, borderRadius: 40 }}
            />
            <Typography variant="h6">
              {selectedChampion.championName}
            </Typography>

            <MyTextField
              label="Fun"
              type="number"
              style={{
                marginLeft: 16,
                width: 80,
              }}
              value={localChampion?.fun}
              onChange={(e) => {
                setLocalChampion({
                  ...localChampion,
                  fun: Number(e.target.value),
                });
              }}
            />
          </FlexVCenter>

          <Flex mt={2} style={{ gap: 16 }}>
            <MyTextField
              label="Runes & spells"
              type="text"
              multiline
              minRows={3}
              value={localChampion?.runes}
              onChange={(e) => {
                setLocalChampion({
                  ...localChampion,
                  runes: e.target.value,
                });
              }}
            />

            <MyTextField
              label="Items"
              type="text"
              multiline
              minRows={3}
              style={{
                width: 280,
              }}
              value={localChampion?.items}
              onChange={(e) => {
                setLocalChampion({
                  ...localChampion,
                  items: e.target.value,
                });
              }}
            />
          </Flex>

          <Flex mt={2}>
            <MyTextField
              label="Extra notes"
              type="text"
              multiline
              minRows={3}
              fullWidth
              value={localChampion?.extraNotes}
              onChange={(e) => {
                setLocalChampion({
                  ...localChampion,
                  extraNotes: e.target.value,
                });
              }}
            />
          </Flex>
        </Box>
      </Paper>
    </Box>
  );
};

export default SelectedChampionPaper;
