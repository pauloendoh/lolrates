import FriendDto from "@/types/domain/playground/FriendDto";
import { apiUrls } from "@/utils/apiUrls";
import { queryKeys } from "@/utils/consts/queryKeys";
import { useMutation, useQueryClient } from "react-query";
import myClientAxios from "../../../../../utils/axios/myClientAxios";
import { pushOrReplace } from "../../../../../utils/pushOrReplace";
import useSnackbarStore from "../../../../zustand-stores/useSnackbarStore";

export default function useSaveFriend() {
  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const queryClient = useQueryClient();

  return useMutation(
    (sent: FriendDto) =>
      myClientAxios
        .request<FriendDto>({
          url: apiUrls.playground.friends,
          data: sent,
          method: sent.id ? "PUT" : "POST",
        })
        .then((res) => res.data),
    {
      onSuccess: (saved) => {
        const friends = queryClient.getQueryData<FriendDto[]>(
          queryKeys.friends
        );
        const newFriends = pushOrReplace(friends, saved, "id");

        queryClient.setQueryData(queryKeys.friends, newFriends);
        setSuccessMessage("Friend saved!");
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}
