import {
  PaginatedResourcesResponseDto,
  ResourceDto,
} from "@/types/domain/playground/paginated/PaginatedResourcesResponseDto";
import { apiUrls } from "@/utils/apiUrls";
import myClientAxios from "@/utils/axios/myClientAxios";
import axios, { Canceler } from "axios";
import { useEffect, useState } from "react";

const useScrollPaginationFetch = (searchPageNumber: number) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [resources, setResources] = useState<ResourceDto[]>([]);

  const reset = () => {
    setError(false);
    setLoading(true);
    setHasMore(false);
    setResources([]);
  };

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel: Canceler;
    myClientAxios
      .get<PaginatedResourcesResponseDto>(
        apiUrls.playground.paginatedResources(searchPageNumber, 3),
        { cancelToken: new axios.CancelToken((c) => (cancel = c)) }
      )
      .then((res) => {
        setResources((prev) => {
          return [...new Set([...prev, ...res.data.data])];
        });

        setHasMore(res.data.total > resources.length);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [searchPageNumber]);

  return { loading, error, resources, hasMore, reset };
};

export default useScrollPaginationFetch;
