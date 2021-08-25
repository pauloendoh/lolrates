import { Box, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import useChampionsQuery from "../../../../../hooks/react-query/auth/useChampionsQuery";
import useSavePlayerChampionMutation from "../../../../../hooks/useSavePlayerChampionMutation";
import { PlayerChampionDto } from "../../../../../types/domain/draft/PlayerChampionDto";
import SaveCancelButtons from "../../../../Shared/Buttons/SaveCancelButtons";
import ChampionSelector from "../../selectors/ChampionSelector/ChampionSelector";
import RoleSelector from "../../selectors/RoleSelector/RoleSelector";
import SkillLevelSelector from "../../selectors/SkillLevelSelector/SkillLevelSelector";

const PlayerChampionDialog = (props: {
  open: boolean;
  initialValue: PlayerChampionDto;
  onClose: () => void;
}) => {
  const { mutate: saveChampion, isLoading } = useSavePlayerChampionMutation();

  const { data: champions } = useChampionsQuery();

  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      fullWidth
      maxWidth="xs"
      aria-labelledby="auth-dialog"
    >
      <Box pb={1} px={1}>
        <Formik
          enableReinitialize
          initialValues={props.initialValue}
          onSubmit={(formikValues) => {
            saveChampion(formikValues, {
              onSettled: () => {
                props.onClose();
              },
            });
          }}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              <DialogTitle id="champion-dialog-title">
                Edit player champion
              </DialogTitle>
              <DialogContent>
                <Box>
                  {champions?.length > 0 && (
                    <ChampionSelector
                      championOptions={champions}
                      onChange={(championId) =>
                        setFieldValue("championId", championId)
                      }
                      selectedChampionId={values.championId}
                    />
                  )}

                  <Box>
                    <RoleSelector
                      selectedRole={values.role}
                      onChange={(role) => setFieldValue("role", role)}
                    />
                  </Box>
                  <Box>
                    <SkillLevelSelector
                      selectedLevel={values.skillLevel}
                      onChange={(level) => setFieldValue("skillLevel", level)}
                    />
                  </Box>

                  {/* <MyTextField
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    size="small"
                    label="Player name"
                    className="mt-3"
                    fullWidth
                    required
                    autoFocus
                  /> */}
                </Box>
              </DialogContent>
              <DialogTitle>
                <SaveCancelButtons
                  disabled={isLoading}
                  onCancel={props.onClose}
                />
              </DialogTitle>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
};

export default PlayerChampionDialog;
