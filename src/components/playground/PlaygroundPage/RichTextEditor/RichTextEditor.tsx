import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter";
import { useMyEffect } from "@/hooks/useMyEffect";
import { localStorageKeys } from "@/utils/consts/localStorageKeys";
import { Button, Grid, makeStyles, useTheme } from "@material-ui/core";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import MUIRichTextEditor, { TKeyCommand } from "mui-rte";
import React, { useState } from "react";

export default function RichTextEditor() {
  const [editorState, setEditorState] = useState<EditorState>(() =>
    EditorState.createEmpty()
  );

  const keyCommands: TKeyCommand[] = [
    {
      key: 13,
      name: "Ctrl + Enter = Save",
      callback: (editorState) => {
        setReadonlyValue(
          JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        );
        return editorState;
      },
    },
  ];

  const [readonlyValue, setReadonlyValue] = useState<string>(undefined);

  const classes = useStyles();

  const theme = useTheme();

  const handleChange = (serializedContent: string) => {
    setReadonlyValue(serializedContent);
    localStorage.setItem(localStorageKeys.editorContent, serializedContent);
    setEditorState(
      EditorState.createWithContent(
        convertFromRaw(JSON.parse(serializedContent))
      )
    );
  };

  const [editorDefaultValue, setEditorDefaultValue] =
    useState<string>(undefined);

  const [readyToChange, setReadyToChange] = useState(false);

  useMyEffect([], () => {
    setTimeout(() => {
      setReadyToChange(true);
    }, 100);

    const contentString = localStorage.getItem(localStorageKeys.editorContent);
    if (contentString) {
      handleChange(contentString);
      setEditorDefaultValue(contentString);
    } else {
      const emptyContent = EditorState.createEmpty().getCurrentContent();

      setEditorDefaultValue(JSON.stringify(convertToRaw(emptyContent)));
    }
  });

  return (
    <Grid container spacing={2} style={{ marginTop: theme.spacing(2) }}>
      <Grid item xs={6} className={classes.editorWrapper}>
        <MUIRichTextEditor
          keyCommands={keyCommands}
          label="Start typing"
          defaultValue={editorDefaultValue}
          onChange={(currentState) => {
            if (readyToChange) {
              handleChange(
                JSON.stringify(convertToRaw(currentState.getCurrentContent()))
              );
            }
          }}
          controls={[
            "title",
            "bold",
            "italic",
            "undelrine",
            "strikethrough",
            "link",
            "media",
            "bulletList",
            "numberList",
            "quote",
            "code",
            "save",
          ]}
          onSave={handleChange}
        />
        <FlexVCenter justifyContent="flex-end" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleChange(
                JSON.stringify(convertToRaw(editorState.getCurrentContent()))
              );
            }}
          >
            Save (Ctrl+Enter)
          </Button>
        </FlexVCenter>
      </Grid>

      <Grid item xs={6}>
        {readonlyValue && (
          <MUIRichTextEditor
            toolbar={false}
            readOnly
            defaultValue={readonlyValue}
          />
        )}
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  editorWrapper: {
    border: "1px solid grey",
    padding: 8,
    borderRadius: 4,

    "& #mui-rte-editor": {
      paddingLeft: theme.spacing(1.5),
    },
    "& .MUIRichTextEditor-placeHolder-26": {
      position: "relative",
      paddingLeft: theme.spacing(1.5),
    },
  },
}));
