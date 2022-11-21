import Flex from "@/components/_common/flexboxes/Flex";
import Icons from "@/components/_common/Icons/Icons";
import Txt from "@/components/_common/text/Txt";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  useTheme,
} from "@material-ui/core";
import "draft-js/dist/Draft.css";
import { useState } from "react";
import DndContainers from "./DndContainers/DndContainers";
import FileSystem from "./FileSystem/FileSystem";
import Friends from "./Friends/Friends";
import FullTextSearchAccordion from "./FullTextSearchAccordion/FullTextSearchAccordion.tsx";
import GraphQLAccordion from "./GraphQLAccordion/GraphQLAccordion";
import InfiniteQueryAccordion from "./InfiniteQueryAccordion/InfiniteQueryAccordion";
import LinkifyAccordion from "./LinkifyAccordion/LinkifyAccordion";
import MantineRTEAccordion from "./MantineRTEAccordion/MantineRTEAccordion";
import MarkdownAccordion from "./MarkdownAccordion/MarkdownAccordion";
import MetascraperAccordion from "./MetascraperAccordion/MetascraperAccordion";
import PaginationAccordion from "./PaginationAccordion/PaginationAccordion";
import RichTextEditor from "./RichTextEditor/RichTextEditor";
import ScrollPaginationAccordion from "./ScrollPaginationAccordion/ScrollPaginationAccordion";
import SocketIOHookAccordion from "./SocketIOHookAccordion/SocketIOHookAccordion";
import StripeAccordion from "./StripeAccordion/StripeAccordion";

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
        <MantineRTEAccordion />

        <SocketIOHookAccordion />
        <FullTextSearchAccordion />
        {/* <SocketIOAccordion /> */}

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
        <MarkdownAccordion />
        <LinkifyAccordion />
        <ScrollPaginationAccordion />
        <InfiniteQueryAccordion />
        <GraphQLAccordion />
        <MetascraperAccordion />
        <StripeAccordion />
        <Box mt={4} />
      </Flex>
    </Container>
  );
}
