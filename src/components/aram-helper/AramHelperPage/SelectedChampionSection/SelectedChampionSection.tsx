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
import { urls } from "@/utils/urls/urls";
import { Box, Paper, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

// PE 1/3 - rename?
const SelectedChampionPaper = () => {
  const { data: allChampionsInfo } = useChampionsQuery();
  const { selectedChampion: selectedAramChampion } = useAramHelperStore();

  const [localAramChampion, setLocalAramChampion] =
    useState<UserAramChampionDto>();

  const { data: myAramChampions } = useMyAramChampionsQuery();

  useEffect(() => {
    if (selectedAramChampion && myAramChampions && allChampionsInfo) {
      const champion = allChampionsInfo.find(
        (x) => x.name === selectedAramChampion.championName
      );
      if (!champion) return;

      const myAramChampion = myAramChampions.find(
        (x) => x.championId === champion.id
      );
      if (myAramChampion) {
        setLocalAramChampion(myAramChampion);
        return;
      }

      const userAramChampionDto = buildUserAramChampionDto({
        championId: champion.id,
      });

      setLocalAramChampion(userAramChampionDto);
      return;
    }

    setLocalAramChampion(buildUserAramChampionDto());
  }, [
    selectedAramChampion,
    // don't want to re-run this effect when myAramChampions changes
    // only when it's length changes
    myAramChampions?.length,
  ]);

  const { mutate } = useSaveAramChampionMutation();

  const debouncedChampion = useDebounce(localAramChampion, 5000);

  useEffect(() => {
    if (!debouncedChampion?.championId) return;

    mutate(debouncedChampion);
  }, [debouncedChampion]);

  if (!selectedAramChampion) return null;
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <FlexVCenter justifyContent={"space-between"}>
            <FlexVCenter style={{ gap: 8 }}>
              <img
                src={selectedAramChampion.iconUrl}
                alt={selectedAramChampion.championName}
                style={{ width: 40, height: 40, borderRadius: 40 }}
              />
              <Typography variant="h6">
                {selectedAramChampion.championName}
              </Typography>

              <MyTextField
                label="Fun"
                type="number"
                style={{
                  marginLeft: 16,
                  width: 80,
                }}
                value={localAramChampion?.fun}
                onChange={(e) => {
                  setLocalAramChampion({
                    ...localAramChampion,
                    fun: Number(e.target.value),
                  });
                }}
              />
            </FlexVCenter>

            <div
              style={{
                display: "flex",
                gap: 8,
              }}
            >
              <a
                style={{
                  textDecoration: "underline",
                }}
                href={urls.others.opggAramChampion(
                  selectedAramChampion.championName
                )}
                target="_blank"
              >
                op.gg
              </a>

              <a
                style={{
                  textDecoration: "underline",
                }}
                href={urls.others.patchNotes(selectedAramChampion.championName)}
                target="_blank"
              >
                patch notes
              </a>
            </div>
          </FlexVCenter>

          <Flex mt={2} style={{ gap: 16 }}>
            <MyTextField
              label="Runes & spells"
              type="text"
              multiline
              minRows={3}
              value={localAramChampion?.runes}
              onChange={(e) => {
                setLocalAramChampion({
                  ...localAramChampion,
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
              value={localAramChampion?.items}
              onChange={(e) => {
                setLocalAramChampion({
                  ...localAramChampion,
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
              value={localAramChampion?.extraNotes}
              onChange={(e) => {
                setLocalAramChampion({
                  ...localAramChampion,
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
