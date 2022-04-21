import Icons from "@/components/_common/Icons/Icons";
import Txt from "@/components/_common/text/Txt";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import "draft-js/dist/Draft.css";
import React, { useCallback, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import useResourcesInfiniteQuery from "./useResourcesInfiniteQuery";

const InfiniteQueryAccordion = () => {
  const qc = useQueryClient();
  const [isOpened, setIsOpened] = useState(false);

  const { data, fetchNextPage, isLoading, hasNextPage } =
    useResourcesInfiniteQuery();

  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage]
  );

  return (
    <Accordion expanded={isOpened}>
      <AccordionSummary
        expandIcon={<Icons.ExpandMore />}
        onClick={() => setIsOpened(!isOpened)}
      >
        <Txt>Infinite Query</Txt>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ maxHeight: 150, overflowY: "auto" }}>
          {data?.pages.map((paginated, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {paginated.data.map((resource, resourceIndex) => {
                if (
                  // last div
                  data.pages.length === pageIndex + 1 &&
                  paginated.data.length === resourceIndex + 1
                )
                  return (
                    <div ref={lastBookElementRef} key={resource.id}>
                      {resource.title}
                    </div>
                  );
                return <div key={resource.id}>{resource.title}</div>;
              })}
            </React.Fragment>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default InfiniteQueryAccordion;
