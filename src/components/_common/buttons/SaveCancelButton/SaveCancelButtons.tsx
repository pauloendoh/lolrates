import { Box, Button } from "@material-ui/core";
import { useHotkeys } from "react-hotkeys-hook";
import S from "./SaveCancelButtons.styles";

const SaveCancelButtons = (props: {
  submitButtonId?: string;
  disabled?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
  onEnabledAndCtrlEnter?: () => void;
  onEnableAndCtrlS?: () => void;
}) => {
  useHotkeys(
    "ctrl+enter",
    () => {
      if (!props.disabled && props.onEnabledAndCtrlEnter) {
        props.onEnabledAndCtrlEnter();
      }
    },
    {
      enableOnFormTags: ["INPUT", "SELECT", "TEXTAREA"],
    },
    [props.disabled, props.onEnabledAndCtrlEnter]
  );

  useHotkeys(
    "ctrl+s",
    (e) => {
      e.preventDefault();
      if (!props.disabled && props.onEnableAndCtrlS) {
        props.onEnableAndCtrlS();
      }
    },
    {
      enableOnFormTags: ["INPUT", "SELECT", "TEXTAREA"],
    },
    [props]
  );

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
