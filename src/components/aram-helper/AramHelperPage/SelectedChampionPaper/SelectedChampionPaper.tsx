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
import useAramHelperStore from "@/hooks/zustand-stores/domain/aram-helper/useAramHelperStore";
import { Box, Button, Paper, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {};

const SelectedChampionPaper = (props: Props) => {
  const { data: champions } = useChampionsQuery();
  const { selectedChampion } = useAramHelperStore();

  const { data: myAramChampions } = useMyAramChampionsQuery();

  const { reset, watch, handleSubmit, control } =
    useForm<UserAramChampionDto>();

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
        reset(myAramChampion);
        return;
      }

      const userAramChampionDto = buildUserAramChampionDto({
        championId: champion.id,
      });
      reset(userAramChampionDto);
      return;
    }

    reset(buildUserAramChampionDto());
  }, [selectedChampion, myAramChampions, champions]);

  const { mutate } = useSaveAramChampionMutation();

  const onSubmit = (data: UserAramChampionDto) => {
    mutate(data);
  };

  if (!selectedChampion) return null;
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FlexVCenter style={{ gap: 8 }}>
              <img
                src={selectedChampion.iconUrl}
                alt={selectedChampion.championName}
                style={{ width: 40, height: 40, borderRadius: 40 }}
              />
              <Typography variant="h6">
                {selectedChampion.championName}
              </Typography>

              {/* //@ts-ignore */}
              <Controller
                control={control}
                name="fun"
                render={({ field }) => (
                  <MyTextField
                    {...field}
                    label="Fun"
                    type="number"
                    style={{
                      marginLeft: 16,
                      width: 80,
                    }}
                  />
                )}
              />
            </FlexVCenter>

            <Flex mt={2} style={{ gap: 16 }}>
              <Controller
                control={control}
                name="runes"
                render={({ field }) => (
                  <MyTextField
                    {...field}
                    label="Runes & spells"
                    type="text"
                    multiline
                    minRows={3}
                  />
                )}
              />

              <Controller
                control={control}
                name="items"
                render={({ field }) => (
                  <MyTextField
                    {...field}
                    label="Items"
                    type="text"
                    multiline
                    minRows={3}
                    style={{
                      width: 280,
                    }}
                  />
                )}
              />
            </Flex>

            <Flex mt={2}>
              <Controller
                control={control}
                name="extraNotes"
                render={({ field }) => (
                  <MyTextField
                    {...field}
                    label="Extra notes"
                    type="text"
                    multiline
                    minRows={3}
                    fullWidth
                  />
                )}
              />
            </Flex>

            <FlexVCenter mt={3}>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </FlexVCenter>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default SelectedChampionPaper;
