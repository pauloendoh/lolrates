import { GameResultDto } from "@/types/domain/ration/GameResultDto";
import { apiUrls } from "@/utils/apiUrls";
import { useQuery } from "react-query";
import myClientAxios from "../../../../utils/axios/myClientAxios";
import useSnackbarStore from "../../../zustand-stores/useSnackbarStore";

const useGameResultsQuery = (q: string) => {
  const options = {
    params: { game: q },
    headers: {
      "x-rapidapi-host": "whatoplay.p.rapidapi.com",
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
    },
  };

  const { setErrorMessage } = useSnackbarStore();

  return useQuery(
    apiUrls.ration.gameResults,
    () => {
      return myClientAxios
        .get<GameResultDto[]>(apiUrls.ration.gameResults, options)
        .then((res) => res.data);
    },
    {
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
};

export default useGameResultsQuery;
