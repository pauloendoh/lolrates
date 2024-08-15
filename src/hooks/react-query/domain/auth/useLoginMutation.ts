import { setCookie } from "nookies";
import { useMutation, useQueryClient } from "react-query";
import { AuthUserGetDto } from "../../../../types/domain/auth/AuthUserGetDto";
import { IAuthData } from "../../../../types/domain/auth/IAuthData";
import { apiUrls } from "../../../../utils/apiUrls";
import myClientAxios from "../../../../utils/axios/myClientAxios";
import useSnackbarStore from "../../../zustand-stores/useSnackbarStore";

export default function useLoginMutation() {
  // const { setUsername } = useAuthStore()

  const { setSuccessMessage, setErrorMessage } = useSnackbarStore();

  const queryClient = useQueryClient();

  return useMutation(
    (authData: IAuthData) =>
      myClientAxios
        .post<AuthUserGetDto>(apiUrls.auth.login, authData)
        .then((res) => res.data),
    {
      onSuccess: (authUser) => {
        setCookie(undefined, "user", JSON.stringify(authUser), {
          maxAge: 60 * 60 * 24 * 365, // one year
        });

        // updating axios default auth header config
        myClientAxios.defaults.headers["x-auth-token"] = authUser.token;

        // refreshing query cache
        queryClient.setQueryData(apiUrls.auth.me, authUser);

        setSuccessMessage("Successful login!");
      },
      onError: (err) => {
        setErrorMessage(JSON.stringify(err));
      },
    }
  );
}
