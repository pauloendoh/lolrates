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
import FileSystem from "./FileSystem/FileSystem";
import Friends from "./Friends/Friends";
import PaginationAccordion from "./PaginationAccordion/PaginationAccordion";
import RichTextEditor from "./RichTextEditor/RichTextEditor";

export default function PlaygroundPage() {
  const [fileSystemIsOpened, openFileSystem] = useState(false);
  const [dndIsOpened, openDnd] = useState(false);
  const [rteIsOpened, openRte] = useState(false);
  const [friendIsOpened, openFriend] = useState(false);

  const theme = useTheme();
  return (
    <Container>
      <Txt variant="h6">Playground</Txt>
      <Flex flexDirection="column" mt={2} style={{ gap: theme.spacing(2) }}>
        <Accordion expanded={fileSystemIsOpened}>
          <AccordionSummary
            expandIcon={<Icons.ExpandMore />}
            onClick={() => openFileSystem(!dndIsOpened)}
          >
            <Txt>File System</Txt>
          </AccordionSummary>
          <AccordionDetails>
            <FileSystem />
          </AccordionDetails>
        </Accordion>

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

        <Accordion expanded={friendIsOpened}>
          <AccordionSummary
            expandIcon={<Icons.ExpandMore />}
            onClick={() => openFriend(!friendIsOpened)}
          >
            <Txt>Friends</Txt>
          </AccordionSummary>
          <AccordionDetails>
            <Friends />
          </AccordionDetails>
        </Accordion>

        <PaginationAccordion />
      </Flex>
    </Container>
  );
}
