import Flex from "@/components/_common/flexboxes/Flex";
import Icons from "@/components/_common/Icons/Icons";
import MantineRTE from "@/components/_common/text/MantineRTE";
import Txt from "@/components/_common/text/Txt";
import useDebounce from "@/hooks/useDebounce";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import nookies from "nookies";
import { useEffect, useState } from "react";

const MantineRTEAccordion = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [value, onChange] = useState("");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    onChange(nookies.get(null)["MantineRTE"]);
  }, []);

  useEffect(() => {
    nookies.set(null, "MantineRTE", debouncedValue);
  }, [debouncedValue]);

  const handleImageUpload = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("image", file);

      fetch(
        "https://api.imgbb.com/1/upload?key=eb82ca90d51d79d4ffd6fe4f10bf058e",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((result) => resolve(result.data.url))
        .catch(() => reject(new Error("Upload failed")));
    });

  return (
    <Accordion expanded={isOpen}>
      <AccordionSummary
        expandIcon={<Icons.ExpandMore />}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Txt>Mantine</Txt>
      </AccordionSummary>
      <AccordionDetails>
        <Flex width="100%" style={{ gap: 16 }}>
          <div style={{ width: "50%" }}>
            <MantineRTE
              value={value}
              onChange={onChange}
              onImageUpload={handleImageUpload}
            />
          </div>
          <div
            style={{ width: "50%" }}
            dangerouslySetInnerHTML={{ __html: value }}
          />
        </Flex>
      </AccordionDetails>
    </Accordion>
  );
};

export default MantineRTEAccordion;
