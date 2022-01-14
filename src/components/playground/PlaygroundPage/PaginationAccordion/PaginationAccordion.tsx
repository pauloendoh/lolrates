import Icons from "@/components/_common/Icons/Icons";
import Txt from "@/components/_common/text/Txt";
import usePaginatedResourcesQuery from "@/hooks/react-query/domain/playground/paginated/usePaginatedResourcesQuery";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import "draft-js/dist/Draft.css";
import { useEffect, useState } from "react";

const PaginationAccordion = () => {
  const [isOpened, setIsOpened] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const { data: paginated, refetch } = usePaginatedResourcesQuery(currentPage);

  useEffect(() => {
    refetch();
  }, [currentPage]);

  return (
    <Accordion expanded={isOpened}>
      <AccordionSummary
        expandIcon={<Icons.ExpandMore />}
        onClick={() => setIsOpened(!isOpened)}
      >
        <Txt>Paginated</Txt>
      </AccordionSummary>
      <AccordionDetails>
        {paginated && (
          <div>
            {paginated.data.map((resource) => (
              <div key={resource.id}>{resource.title}</div>
            ))}
            <Pagination
              count={paginated.last_page}
              onChange={(e, page) => setCurrentPage(page)}
            />
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default PaginationAccordion;
