import Flex from "@/components/_common/flexboxes/Flex";
import FlexCol from "@/components/_common/flexboxes/FlexCol";
import Icons from "@/components/_common/Icons/Icons";
import useGameResultsQuery from "@/hooks/react-query/domain/ration/useGameResultsQuery";
import { Link, Paper, Typography } from "@material-ui/core";
import "draft-js/dist/Draft.css";
import { useEffect } from "react";

interface Props {
  query: string;
}

const GameResults = ({ query }: Props) => {
  const { data: gameResults, refetch } = useGameResultsQuery(query);

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <FlexCol style={{ gap: 16 }}>
      {gameResults &&
        gameResults.map((game) => (
          // PE 1/3 - DRY with imdb results
          <Paper key={game.game_id} style={{ padding: 16 }}>
            <Flex style={{ gap: 16 }}>
              {game.box_art?.length > 0 ? (
                <img src={game.box_art} width="100px" />
              ) : (
                <div style={{ width: 100 }} />
              )}

              <div>
                <Flex style={{ gap: 8 }}>
                  <Typography>
                    {game.game_name} (
                    {new Date(game.release_date).getFullYear()})
                  </Typography>
                  <Link href={game.game_url} target="_blank">
                    <Icons.Link />
                  </Link>
                </Flex>
                {game.platform}
              </div>
            </Flex>
          </Paper>
        ))}
    </FlexCol>
  );
};

export default GameResults;
