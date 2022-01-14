import { BookResultItemDto } from "@/types/domain/ration/BookResultItemDto";
import { apiUrls } from "@/utils/apiUrls";
import { useQuery } from "react-query";
import myClientAxios from "../../../../utils/axios/myClientAxios";
import useSnackbarStore from "../../../zustand-stores/useSnackbarStore";

const useBookResultsQuery = (q: string) => {
  const options = {
    params: { q, page: "1" },
    headers: {
      "x-rapidapi-host": "goodreads-books.p.rapidapi.com",
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
    },
  };

  const { setErrorMessage } = useSnackbarStore();

  return useQuery(
    apiUrls.ration.bookResults,
    () => {
      return myClientAxios
        .get<BookResultItemDto[] & { error?: boolean }>(
          apiUrls.ration.bookResults,
          options
        )
        .then((res) => {
          if (res.data.error) return [];
          return res.data;
        });
    },
    {
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
};

export default useBookResultsQuery;
