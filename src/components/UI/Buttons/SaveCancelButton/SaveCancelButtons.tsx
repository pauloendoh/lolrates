import { Box, Button } from "@material-ui/core";
import React from "react";
import S from './SaveCancelButtons.styles';

const SaveCancelButtons = (props: {
  submitButtonId?: string;
  disabled?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
}) => {
  return (
    <S.Root>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        id={props.submitButtonId}
        disabled={props.disabled}
        onClick={props.onSave}
      >
        Save
      </Button>

      <Box ml={1}>
        <Button onClick={props.onCancel} variant="outlined">
          Cancel
        </Button>
      </Box>
    </S.Root>
  );
};

export default SaveCancelButtons;
