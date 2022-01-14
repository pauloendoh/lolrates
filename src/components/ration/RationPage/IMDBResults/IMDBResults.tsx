import Flex from "@/components/_common/flexboxes/Flex";
import FlexCol from "@/components/_common/flexboxes/FlexCol";
import Icons from "@/components/_common/Icons/Icons";
import useImdbResultsQuery from "@/hooks/react-query/domain/ration/useImdbResultsQuery";
import { Link, Paper, Typography } from "@material-ui/core";
import "draft-js/dist/Draft.css";
import { useEffect, useMemo } from "react";

interface Props {
  query: string;
  titleType: "tvSeries" | "movie";
}

const IMDBResults = ({ query, titleType }: Props) => {
  const { data: result, refetch } = useImdbResultsQuery(query);

  useEffect(() => {
    refetch();
  }, [query]);

  const filteredResults = useMemo(() => {
    return result?.results?.filter((r) => r.titleType === titleType) || [];
  }, [result]);

  return (
    <FlexCol style={{ gap: 16 }}>
      {filteredResults.map((movie) => (
        <Paper key={movie.id} style={{ padding: 16 }}>
          <Flex style={{ gap: 16 }}>
            {movie.image?.url ? (
              <img src={movie.image.url} width="100px" />
            ) : (
              <div style={{ width: 100 }} />
            )}

            <Flex style={{ gap: 8 }}>
              <Typography>
                {movie.title} ({movie.year})
              </Typography>
              <Link href={`https://www.imdb.com${movie.id}`} target="_blank">
                <Icons.Link />
              </Link>
            </Flex>
          </Flex>
        </Paper>
      ))}
    </FlexCol>
  );
};

export default IMDBResults;
