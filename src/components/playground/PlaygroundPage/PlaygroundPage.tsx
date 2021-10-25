import Flex from "@/components/_common/flexboxes/Flex";
import Icons from "@/components/_common/Icons/Icons";
import Txt from "@/components/_common/text/Txt";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  useTheme,
} from "@material-ui/core";
import "draft-js/dist/Draft.css";
import { useState } from "react";
import DndContainers from "./DndContainers/DndContainers";
import RichTextEditor from "./RichTextEditor/RichTextEditor";

export default function PlaygroundPage() {
  const [dndIsOpened, openDnd] = useState(true);
  const [rteIsOpened, openRte] = useState(false);

  const theme = useTheme();
  return (
    <Container>
      <Txt variant="h6">Playground</Txt>
      <Flex flexDirection="column" mt={2} style={{ gap: theme.spacing(2) }}>
        <Accordion expanded={dndIsOpened}>
          <AccordionSummary
            expandIcon={<Icons.ExpandMore />}
            onClick={() => openDnd(!dndIsOpened)}
          >
            <Txt>Drag'n Drop</Txt>
          </AccordionSummary>
          <AccordionDetails>
            <DndContainers />
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={rteIsOpened}>
          <AccordionSummary
            expandIcon={<Icons.ExpandMore />}
            onClick={() => openRte(!rteIsOpened)}
          >
            <Txt>Rich Text Editor</Txt>
          </AccordionSummary>
          <AccordionDetails>
            <RichTextEditor />
          </AccordionDetails>
        </Accordion>
      </Flex>
    </Container>
  );
}
