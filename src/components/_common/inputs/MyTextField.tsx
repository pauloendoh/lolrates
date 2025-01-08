import { TextField } from "@material-ui/core";
import React from "react";
import { MdClear } from "react-icons/md";

type Props = React.ComponentProps<typeof TextField> & {
  onClickClearIcon?: () => void;
};

const MyTextField = (props: Props) => {
  return (
    <TextField
      size="small"
      autoComplete="off"
      variant="outlined"
      InputProps={
        props.onClickClearIcon
          ? {
              endAdornment: (
                <MdClear
                  style={{ cursor: "pointer" }}
                  onClick={props.onClickClearIcon}
                />
              ),
            }
          : undefined
      }
      {...props}
    />
  );
};

export default MyTextField;
