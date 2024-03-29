import { urls } from "@/utils/urls/urls";
import { CircularProgress } from "@material-ui/core";
import useMeQuery from "hooks/react-query/domain/auth/useMeQuery";
import { useRouter } from "next/dist/client/router";
import React from "react";
import S from "./Page.styles";

interface Props {
  type: "auth" | "unauth" | "public";
  children?: React.ReactNode;
}

export default function Page(props: Props) {
  const { data: authUser, isLoading } = useMeQuery();

  const router = useRouter();

  if (props.type === "auth") {
    if (isLoading)
      return (
        <S.PageRoot>
          <CircularProgress />
        </S.PageRoot>
      );

    if (authUser === null) router.push(urls.pages.index);
  }

  return <>{props.children}</>;
}
