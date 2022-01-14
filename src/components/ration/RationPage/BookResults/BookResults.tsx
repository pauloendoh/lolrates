import Flex from "@/components/_common/flexboxes/Flex";
import FlexCol from "@/components/_common/flexboxes/FlexCol";
import Icons from "@/components/_common/Icons/Icons";
import useBookResultsQuery from "@/hooks/react-query/domain/ration/useBookResultsQuery";
import { Link, Paper, Typography } from "@material-ui/core";
import "draft-js/dist/Draft.css";
import { useEffect } from "react";

interface Props {
  query: string;
}

const BookResults = ({ query }: Props) => {
  const { data: books, refetch } = useBookResultsQuery(query);

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <FlexCol style={{ gap: 16 }}>
      {books &&
        books.map((book) => (
          // PE 1/3 - DRY with imdb results
          <Paper key={book.id} style={{ padding: 16 }}>
            <Flex style={{ gap: 16 }}>
              {book.smallImageURL?.length > 0 ? (
                <img src={book.smallImageURL} width="30px" />
              ) : (
                <div style={{ width: 30 }} />
              )}
              <Flex style={{ gap: 8 }}>
                <Typography>
                  {book.title} ({book.publicationYear})
                </Typography>
                <Link
                  href={`https://www.goodreads.com/book/show/${book.id}`}
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

export default BookResults;
