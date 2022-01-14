import { MovieResultResponseDto } from "@/types/domain/ration/MovieResultResponseDto";
import { apiUrls } from "@/utils/apiUrls";
import { useQuery } from "react-query";
import myClientAxios from "../../../../utils/axios/myClientAxios";
import useSnackbarStore from "../../../zustand-stores/useSnackbarStore";

const useImdbResultsQuery = (q: string) => {
  const options = {
    params: { q },
    headers: {
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
    },
  };

  const { setErrorMessage } = useSnackbarStore();

  return useQuery(
    apiUrls.ration.movieResults,
    () =>
      myClientAxios
        .get<MovieResultResponseDto>(apiUrls.ration.movieResults, options)
        .then((res) => res.data),
    {
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
};

export default useImdbResultsQuery;
