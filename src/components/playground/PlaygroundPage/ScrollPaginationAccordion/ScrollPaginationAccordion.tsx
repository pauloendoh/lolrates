import Icons from "@/components/_common/Icons/Icons";
import Txt from "@/components/_common/text/Txt";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import "draft-js/dist/Draft.css";
import { useCallback, useEffect, useRef, useState } from "react";
import useScrollPaginationFetch from "./useScrollPaginationFetch";

const ScrollPaginationAccordion = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  const { resources, hasMore, loading, error, reset } =
    useScrollPaginationFetch(pageNumber);

  useEffect(() => {
    if (isOpened) {
      setPageNumber(1);
      reset();
    }
  }, [isOpened]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <Accordion expanded={isOpened}>
      <AccordionSummary
        expandIcon={<Icons.ExpandMore />}
        onClick={() => setIsOpened(!isOpened)}
      >
        <Txt>Scroll pagination</Txt>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ maxHeight: 150, overflowY: "auto" }}>
          {resources.map((resource, index) => {
            if (resources.length === index + 1)
              return (
                <div ref={lastBookElementRef} key={resource.id}>
                  {resource.title}
                </div>
              );
            return <div key={resource.id}>{resource.title}</div>;
          })}

          {/* <Backdrop open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop> */}
          <div>{error && "Error"}</div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ScrollPaginationAccordion;
