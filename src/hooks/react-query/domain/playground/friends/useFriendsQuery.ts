import FriendDto from "@/types/domain/playground/FriendDto";
import { apiUrls } from "@/utils/apiUrls";
import { queryKeys } from "@/utils/consts/queryKeys";
import { useQuery } from "react-query";
import myClientAxios from "../../../../../utils/axios/myClientAxios";
import useSnackbarStore from "../../../../zustand-stores/useSnackbarStore";

export default function useFriendsQuery() {
  const { setErrorMessage } = useSnackbarStore();

  return useQuery(
    queryKeys.friends,
    () =>
      myClientAxios
        .get<FriendDto[]>(apiUrls.playground.friends)
        .then((res) => res.data),
    {
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}
