import { PaginatedResourcesResponseDto } from "@/types/domain/playground/paginated/PaginatedResourcesResponseDto";
import { apiUrls } from "@/utils/apiUrls";
import { queryKeys } from "@/utils/consts/queryKeys";
import { useQuery } from "react-query";
import myClientAxios from "../../../../../utils/axios/myClientAxios";
import useSnackbarStore from "../../../../zustand-stores/useSnackbarStore";

export default function usePaginatedResourcesQuery(page: number) {
  const { setErrorMessage } = useSnackbarStore();

  return useQuery(
    queryKeys.paginatedResources(page),
    () =>
      myClientAxios
        .get<PaginatedResourcesResponseDto>(
          apiUrls.playground.paginatedResources(page)
        )
        .then((res) => res.data),
    {
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
      keepPreviousData: true,
    }
  );
}
