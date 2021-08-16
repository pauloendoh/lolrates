import { setCookie } from 'nookies'
import { useMutation, useQueryClient } from "react-query"
import { apiRoutes } from "../consts/apiRoutes"
import myClientAxios from "../utils/axios/myClientAxios"
import { AuthUserGetDto } from "../types/dtos/auth/AuthUserGetDto"
import { IAuthData } from "../types/IAuthData"
import { myQueryClient } from '../consts/myQueryClient'

export default function useLoginMutation() {
  // const { setUsername } = useAuthStore()

  // const queryClient = useQueryClient()

  return useMutation(
    (authData: IAuthData) =>
      myClientAxios.post<AuthUserGetDto>(apiRoutes.auth.login, authData).then(
        (res) => res.data
      ),
    {
      onSuccess: (authUser) => {
        // setUsername(res.username)
        setCookie(undefined, 'user', JSON.stringify(authUser))

        // updating axios default auth header config
        myClientAxios.defaults.headers['x-auth-token'] = authUser.token

        // refreshing query cache
        myQueryClient.setQueryData(apiRoutes.auth.me, authUser)

      },
      onError: (err) => {
        alert(err)
      }
    }

  )
}

