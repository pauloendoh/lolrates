import { setCookie } from "nookies";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { apiRoutes } from "../../../../utils/apiRoutes";
import { AuthUserGetDto } from "../../../../types/domain/auth/AuthUserGetDto";
import { IAuthData } from "../../../../types/domain/auth/IAuthData";
import myClientAxios from "../../../../utils/axios/myClientAxios";
import useSnackbarStore from "../../../zustand-stores/useSnackbarStore";

export default function useLoginMutation() {
  // const { setUsername } = useAuthStore()


  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const queryClient = useQueryClient()

  return useMutation(
    (authData: IAuthData) =>
      myClientAxios
        .post<AuthUserGetDto>(apiRoutes.auth.login, authData)
        .then((res) => res.data),
    {
      onSuccess: (authUser) => {
        // setUsername(res.username)
        setCookie(undefined, "user", JSON.stringify(authUser));

        // updating axios default auth header config
        myClientAxios.defaults.headers["x-auth-token"] = authUser.token;

        // refreshing query cache
        queryClient.setQueryData(apiRoutes.auth.me, authUser);

        setSuccessMessage("Successful login!");
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}