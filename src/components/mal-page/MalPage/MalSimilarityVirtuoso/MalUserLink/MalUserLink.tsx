import React from "react";

type Props = {
  username: string;
  children: React.ReactNode;
};

const MalUserLink = (props: Props) => {
  return (
    <a
      href={`https://myanimelist.net/profile/${props.username}`}
      target="_blank"
      rel="noreferrer"
    >
      {props.children}
    </a>
  );
};

export default MalUserLink;
