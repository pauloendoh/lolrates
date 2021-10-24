import { Typography } from "@material-ui/core";
import React from "react";

// PE 1/3 - remove? not being used
const TextSecondary = (props: Props) => {
  return (
    <Typography variant="inherit" color="secondary" {...props}>
      {props.children}
    </Typography>
  );
};

type Props = React.ComponentProps<typeof Typography>;

export default TextSecondary;
