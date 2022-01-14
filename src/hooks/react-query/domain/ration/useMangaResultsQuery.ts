import { MangaResultResponseDto } from "@/types/domain/ration/MangaResultResponseDto";
import { apiUrls } from "@/utils/apiUrls";
import { useQuery } from "react-query";
import myClientAxios from "../../../../utils/axios/myClientAxios";
import useSnackbarStore from "../../../zustand-stores/useSnackbarStore";

const useMangaResultsQuery = (q: string) => {
  const options = {
    params: { q },
    headers: {
      "x-rapidapi-host": "jikan1.p.rapidapi.com",
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
    },
  };

  const { setErrorMessage } = useSnackbarStore();

  return useQuery(
    apiUrls.ration.mangaResults,
    () => {
      return myClientAxios
        .get<MangaResultResponseDto>(apiUrls.ration.mangaResults, options)
        .then((res) => res.data);
    },
    {
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
};

export default useMangaResultsQuery;
