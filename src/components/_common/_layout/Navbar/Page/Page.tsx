import { pageUrls } from "@/utils/pageUrls";
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
  const { data: authUser, isFetching } = useMeQuery({
    refetchOnWindowFocus: false,
    retry: false,
  });

  const router = useRouter();

  if (props.type === "auth") {
    if (isFetching)
      return (
        <S.PageRoot>
          <CircularProgress />
        </S.PageRoot>
      );

    if (authUser === null) router.push(pageUrls.index);
  }

  return <>{props.children}</>;
}
