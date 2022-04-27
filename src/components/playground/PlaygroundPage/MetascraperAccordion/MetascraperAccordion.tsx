import Flex from "@/components/_common/flexboxes/Flex";
import FlexCol from "@/components/_common/flexboxes/FlexCol";
import Icons from "@/components/_common/Icons/Icons";
import MyTextField from "@/components/_common/inputs/MyTextField";
import Txt from "@/components/_common/text/Txt";
import useDebounce from "@/hooks/useDebounce";
import { apiUrls } from "@/utils/apiUrls";
import isValidHttpUrl from "@/utils/text/isValidHttpUrl";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";

export interface Response {
  description: string;
  image: string;
  title: string;
}

const MetascraperAccordion = () => {
  const [isOpened, setIsOpened] = useState(false);

  const [text, setText] = useState("");

  const debouncedText = useDebounce(text, 500);

  const [response, setResponse] = useState<Response>(null);

  useEffect(() => {
    if (!isValidHttpUrl(debouncedText)) return;

    axios
      .get<Response>(apiUrls.myLinkPreview, { params: { url: debouncedText } })
      .then((res) => setResponse(res.data));
  }, [debouncedText]);

  return (
    <Accordion expanded={isOpened}>
      <AccordionSummary
        expandIcon={<Icons.ExpandMore />}
        onClick={() => setIsOpened(!isOpened)}
      >
        <Txt>metascraper</Txt>
      </AccordionSummary>
      <AccordionDetails>
        <Flex>
          <Box style={{ width: 300 }}>
            <MyTextField
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              multiline
              fullWidth
            />
          </Box>

          {response && (
            <Flex ml={4}>
              <Box mt={1}>
                <img src={response.image} alt={response.title} width="200px" />
              </Box>

              <FlexCol ml={1} style={{ gap: 8, flexGrow: 1 }}>
                <Txt variant="h5">{response.title}</Txt>

                <Txt>{response.description}</Txt>
              </FlexCol>
            </Flex>
          )}
        </Flex>
      </AccordionDetails>
    </Accordion>
  );
};

export default MetascraperAccordion;
