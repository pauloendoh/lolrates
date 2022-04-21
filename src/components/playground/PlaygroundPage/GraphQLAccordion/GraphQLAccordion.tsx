import Flex from "@/components/_common/flexboxes/Flex";
import Icons from "@/components/_common/Icons/Icons";
import Txt from "@/components/_common/text/Txt";
import { useRestaurantsQuery } from "@/generated/graphql";
import myGraphQLClient from "@/utils/graphql/myGraphQLClient";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@material-ui/core";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const GraphQLAccordion = () => {
  const [isOpened, setIsOpened] = useState(false);

  const { isLoading, data } = useRestaurantsQuery(myGraphQLClient);

  return (
    <Accordion expanded={isOpened}>
      <AccordionSummary
        expandIcon={<Icons.ExpandMore />}
        onClick={() => setIsOpened(!isOpened)}
      >
        <Txt>GraphQL</Txt>
      </AccordionSummary>
      <AccordionDetails>
        {isLoading || !data ? (
          <div>Loading...</div>
        ) : (
          <div>
            {data.restaurants.data.map((restaurant) => (
              <Flex key={restaurant.id}>
                <Box style={{ width: 300 }}>{restaurant.attributes.name}</Box>
                <Box style={{ flexGrow: 1 }}>
                  <ReactMarkdown>
                    {restaurant.attributes.description}
                  </ReactMarkdown>
                </Box>
              </Flex>
            ))}
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default GraphQLAccordion;
