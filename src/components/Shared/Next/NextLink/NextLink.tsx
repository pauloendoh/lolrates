import Link from "next/link";
import React from "react";

// PE 3/3
const NextLink = (props: Props) => {
  return <Link {...props}>{props.children}</Link>;
};

type Props = React.ComponentProps<typeof Link>;

export default NextLink;
