import { Virtuoso } from "react-virtuoso";

import Flex from "@/components/_common/flexboxes/Flex";
import FlexCol from "@/components/_common/flexboxes/FlexCol";
import useMalSimilarityQuery from "@/hooks/react-query/domain/mal/useMalSimilarityQuery";
import useToggleMalCheckMutation from "@/hooks/react-query/domain/mal/useToggleMalCheckMutation";
import { Box, Checkbox, Typography } from "@material-ui/core";
import { useMemo } from "react";
import MalUserLink from "./MalUserLink/MalUserLink";

type Props = {};

type SortBy = "animePercentage" | "mangaPercentage" | "avgPercentage";

const MalSimilarityVirtuoso = (props: Props) => {
  const { data } = useMalSimilarityQuery();
  const sortedData = useMemo(() => {
    if (!data) return [];
    return data
      .map((d) => ({
        ...d,
        avgPercentage: (d.animePercentage + d.mangaPercentage) / 2,
        sumCount: d.animeCount + d.mangaCount,
      }))
      .sort((a, b) => {
        const SORTING_BY = "avgPercentage" as SortBy;

        return b[SORTING_BY] - a[SORTING_BY];
      })
      .filter((item) => {
        const isBrazil =
          item.location.toLowerCase().includes("brazil") ||
          item.location.toLowerCase().includes("brasil");

        const isBrazilOrEmpty = item.location === "" || isBrazil;

        const isFemaleOrEmpty = item.gender === "Female" || item.gender === "";

        const MIN_PERCENTAGE = 40;
        const MIN_COUNT = 80;

        return (
          item.avgPercentage > MIN_PERCENTAGE &&
          item.gender === "Female" &&
          // isFemaleOrEmpty &&
          item.sumCount > MIN_COUNT &&
          // isBrazil &&
          // item.checked === false &&
          // isBrazilOrEmpty &&
          true
        );
      });
  }, [data]);

  const { mutate } = useToggleMalCheckMutation();
  return (
    <Box>
      <Typography variant="h4">
        {sortedData?.length} items (total {data?.length})
      </Typography>

      <Virtuoso
        style={{
          height: "calc(100vh - 100px)",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
        totalCount={sortedData?.length || 0}
        itemContent={(index) => {
          const item = sortedData?.[index];
          if (!item) return null;

          return (
            <Flex mb={5}>
              {item.imageUrl ? (
                <MalUserLink username={item.usernameB}>
                  <img
                    src={item.imageUrl}
                    style={{
                      width: 100,
                      height: 100,

                      objectFit: "cover",
                    }}
                  />
                </MalUserLink>
              ) : (
                <div
                  style={{
                    width: 100,
                    height: 100,
                  }}
                />
              )}
              <FlexCol
                ml={1}
                pr={2}
                width="240px"
                sx={{
                  borderRight: "1px solid #ccc",
                }}
              >
                <MalUserLink username={item.usernameB}>
                  <Typography variant="h6">
                    {item.usernameB}
                    <span>
                      <Checkbox
                        onClick={() => mutate(item.id)}
                        checked={item.checked}
                      />
                    </span>
                  </Typography>
                </MalUserLink>

                {item.gender && <Typography>Gender: {item.gender}</Typography>}

                {item.birthday && (
                  <Typography>Birthday: {item.birthday}</Typography>
                )}

                {item.location && (
                  <Typography>Location: {item.location}</Typography>
                )}

                {item.lastOnlineAt && (
                  <Typography>Last online: {item.lastOnlineAt}</Typography>
                )}
              </FlexCol>

              <FlexCol ml={2}>
                <Typography
                  variant="h5"
                  style={{
                    fontWeight: 600,
                  }}
                >
                  Shared: {item.sumCount} ({item.avgPercentage.toFixed(1)}%)
                </Typography>

                <Typography>
                  Anime: {item.animeCount} ({item.animePercentage}%)
                </Typography>
                <Typography>
                  Manga: {item.mangaCount} ({item.mangaPercentage}%)
                </Typography>
              </FlexCol>
            </Flex>
          );
        }}
      />
    </Box>
  );
};

export default MalSimilarityVirtuoso;
