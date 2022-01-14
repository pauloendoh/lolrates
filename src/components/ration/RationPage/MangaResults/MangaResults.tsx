import Flex from "@/components/_common/flexboxes/Flex";
import FlexCol from "@/components/_common/flexboxes/FlexCol";
import Icons from "@/components/_common/Icons/Icons";
import useMangaResultsQuery from "@/hooks/react-query/domain/ration/useMangaResultsQuery";
import { Link, Paper, Typography } from "@material-ui/core";
import "draft-js/dist/Draft.css";
import { useEffect, useMemo } from "react";

interface Props {
  query: string;
}

const MangaResults = ({ query }: Props) => {
  const { data: response, refetch } = useMangaResultsQuery(query);

  useEffect(() => {
    refetch();
  }, [query]);

  const filteredResults = useMemo(() => {
    return response?.results.filter((r) => r.type === "Manga") || [];
  }, [response]);

  return (
    <FlexCol style={{ gap: 16 }}>
      {filteredResults.map((manga) => (
        // PE 1/3 - DRY with imdb results
        <Paper key={manga.mal_id} style={{ padding: 16 }}>
          <Flex style={{ gap: 16 }}>
            {manga.image_url?.length > 0 ? (
              <img src={manga.image_url} width="30px" />
            ) : (
              <div style={{ width: 30 }} />
            )}
            <Flex style={{ gap: 8 }}>
              <Typography>
                {manga.title} ({new Date(manga.start_date).getFullYear()})
              </Typography>
              <Link
                href={`https://myanimelist.net/manga/${manga.mal_id}`}
                target="_blank"
              >
                <Icons.Link />
              </Link>
            </Flex>
          </Flex>
        </Paper>
      ))}
    </FlexCol>
  );
};

export default MangaResults;
