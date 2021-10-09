import Image from "next/image";
import React from "react";

// PE 3/3
const NextImage = (props: Props) => {
  return <Image {...props}>{props.children}</Image>;
};

type Props = React.ComponentProps<typeof Image>;

export default NextImage;
