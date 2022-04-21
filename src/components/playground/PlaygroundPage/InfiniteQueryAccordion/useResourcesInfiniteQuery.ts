import { PaginatedResourcesResponseDto } from "@/types/domain/playground/paginated/PaginatedResourcesResponseDto";
import { apiUrls } from "@/utils/apiUrls";
import myClientAxios from "@/utils/axios/myClientAxios";
import { queryKeys } from "@/utils/consts/queryKeys";
import { useInfiniteQuery } from "react-query";

const useResourcesInfiniteQuery = () => {
  const fetchResources = ({ pageParam = 1 }) =>
    myClientAxios
      .get<PaginatedResourcesResponseDto>(
        apiUrls.playground.paginatedResources(pageParam, 3)
      )
      .then((res) => res.data);

  return useInfiniteQuery<PaginatedResourcesResponseDto, Error>(
    queryKeys.paginatedResourcesInfinite,
    fetchResources,
    {
      getNextPageParam: (lastPage) => lastPage.next_page,
    }
  );
};

export default useResourcesInfiniteQuery;
