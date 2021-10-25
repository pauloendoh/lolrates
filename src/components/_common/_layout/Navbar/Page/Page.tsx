import FlexCenter from "@/components/_common/flexboxes/FlexCenter";
import { pageUrls } from "@/utils/pageUrls";
import { CircularProgress } from "@material-ui/core";
import useMeQuery from "hooks/react-query/domain/auth/useMeQuery";
import { useRouter } from "next/dist/client/router";
import React from "react";

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
        <FlexCenter height="100%" width="100%">
          <CircularProgress />
        </FlexCenter>
      );

    if (authUser === null) router.push(pageUrls.index);
  }

  return <>{props.children}</>;
}
