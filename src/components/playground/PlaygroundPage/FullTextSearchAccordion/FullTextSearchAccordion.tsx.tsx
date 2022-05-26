import Flex from "@/components/_common/flexboxes/Flex";
import Icons from "@/components/_common/Icons/Icons";
import MyTextField from "@/components/_common/inputs/MyTextField";
import Txt from "@/components/_common/text/Txt";
import useDebounce from "@/hooks/useDebounce";
import useSnackbarStore from "@/hooks/zustand-stores/useSnackbarStore";
import { ResourceDto } from "@/types/domain/playground/paginated/PaginatedResourcesResponseDto";
import myClientAxios from "@/utils/axios/myClientAxios";
import { urls } from "@/utils/urls";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import { useEffect, useState } from "react";

const FullTextSearchAccordion = () => {
  const { setErrorMessage } = useSnackbarStore();

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [resources, setResources] = useState<ResourceDto[]>([]);

  const debouncedValue = useDebounce(value, 250);

  useEffect(() => {
    setLoading(true);
    myClientAxios
      .get<ResourceDto[]>(
        urls.api.playground.fullTextSeachResources(debouncedValue)
      )
      .then((res) => {
        setResources(res.data);
      })
      .catch((err) => console.log(err.message))
      .finally(() => setLoading(false));
  }, [debouncedValue]);

  return (
    <Accordion expanded={isOpened}>
      <AccordionSummary
        expandIcon={<Icons.ExpandMore />}
        onClick={() => setIsOpened(!isOpened)}
      >
        <Txt>Full Text Search</Txt>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          <div>
            <MyTextField
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          <Flex mt={2} style={{ flexDirection: "column", gap: 16 }}>
            {loading && <div>Loading...</div>}
            {resources.map((resource) => (
              <Flex key={resource.id}>{JSON.stringify(resource)}</Flex>
            ))}
          </Flex>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default FullTextSearchAccordion;
