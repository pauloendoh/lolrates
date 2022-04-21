import Icons from "@/components/_common/Icons/Icons";
import MyTextField from "@/components/_common/inputs/MyTextField";
import Txt from "@/components/_common/text/Txt";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import { useState } from "react";
import ReactLinkify from "react-linkify";
import "react-mde/lib/styles/css/react-mde-all.css";
import S from "./styles";

const LinkifyAccordion = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [text, setText] = useState("");

  return (
    <Accordion expanded={isOpened}>
      <AccordionSummary
        expandIcon={<Icons.ExpandMore />}
        onClick={() => setIsOpened(!isOpened)}
      >
        <Txt>Linkify</Txt>
      </AccordionSummary>
      <AccordionDetails>
        <S.Container>
          <MyTextField
            multiline
            style={{ width: 300 }}
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
          />

          <div style={{ whiteSpace: "pre-wrap" }}>
            <ReactLinkify>{text}</ReactLinkify>
          </div>
        </S.Container>
      </AccordionDetails>
    </Accordion>
  );
};

export default LinkifyAccordion;
