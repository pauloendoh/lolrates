import Flex from "@/components/_common/flexboxes/Flex";
import MyTextField from "@/components/_common/inputs/MyTextField";
import Txt from "@/components/_common/text/Txt";
import RationItemType from "@/types/domain/ration/RationItemType";
import { urls } from "@/utils/urls";
import {
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  useTheme,
} from "@material-ui/core";
import "draft-js/dist/Draft.css";
import { useRouter } from "next/dist/client/router";
import { ReactElement, useCallback, useEffect, useState } from "react";
import BookResults from "./BookResults/BookResults";
import GameResults from "./GameResults/GameResults";
import IMDBResults from "./IMDBResults/IMDBResults";
import MangaResults from "./MangaResults/MangaResults";
import rationSidebarItems from "./_utils/rationSidebarItems";

const RationPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const queryParams = router.query as { q?: string; type?: RationItemType };

  const [textFilter, setTextFilter] = useState(queryParams.q || "");

  const [throttle, setThrottle] = useState<NodeJS.Timeout>();

  useEffect(() => {
    const url = urls.pages.rationSearch(textFilter, queryParams.type);

    clearTimeout(throttle);
    setThrottle(
      setTimeout(() => {
        router.replace(url);
      }, 500)
    );
  }, [textFilter]);

  const CurrentResultComponent = useCallback(() => {
    if (queryParams.type) {
      const config: { [key in RationItemType]: ReactElement } = {
        movie: <IMDBResults query={queryParams.q} titleType="movie" />,
        "tv-series": <IMDBResults query={queryParams.q} titleType="tvSeries" />,
        book: <BookResults query={queryParams.q} />,
        manga: <MangaResults query={queryParams.q} />,
        game: <GameResults query={queryParams.q} />,
      };

      return config[queryParams.type];
    }
    return null;
  }, [queryParams.type, queryParams.q]);

  return (
    <Container>
      <Txt variant="h6">Ration</Txt>
      <Flex mt={2} style={{ gap: theme.spacing(2) }}>
        <Paper
          style={{
            width: 300,
            padding: theme.spacing(2),
            height: "fit-content",
          }}
        >
          <MyTextField
            fullWidth
            label="Search"
            autoFocus
            value={textFilter}
            onChange={(e) => setTextFilter(e.target.value)}
          />

          <List>
            {rationSidebarItems.map((item) => (
              <ListItem
                key={item.id}
                button
                selected={item.id === queryParams.type}
                onClick={() => {
                  router.replace(
                    urls.pages.rationSearch(queryParams.q, item.id)
                  );
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Paper>

        <div>
          <CurrentResultComponent />
        </div>
      </Flex>
    </Container>
  );
};

export default RationPage;
