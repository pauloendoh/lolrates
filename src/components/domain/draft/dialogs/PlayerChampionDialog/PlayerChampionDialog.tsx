import { Box, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import useChampionRadarsQuery from "../../../../../hooks/domain/championRadar/useChampionRadarsQuery";
import useSaveChampionRadarMutation from "../../../../../hooks/domain/championRadar/useSaveChampionRadarMutation";
import useSavePlayerChampionMutation from "../../../../../hooks/domain/playerChampion/useSavePlayerChampionMutation";
import useChampionsQuery from "../../../../../hooks/react-query/auth/useChampionsQuery";
import {
  ChampionRadarDto,
  getChampionRadarDto
} from "../../../../../types/domain/draft/ChampionRadarDto";
import { PlayerChampionDto } from "../../../../../types/domain/draft/PlayerChampionDto";
import SaveCancelButtons from "../../../../Shared/Buttons/SaveCancelButtons";
import MyTextField from "../../../../Shared/MyInputs/MyTextField";
import ChampionRadar from "../../ChampionRadar/ChampionRadar";
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

  const { data: cRadars } = useChampionRadarsQuery();

  const [cRadar, setCRadar] = useState<ChampionRadarDto>(null);
  const [selectedChampionId, setSelectedChampionId] = useState<number>(
    props.initialValue?.championId
  );

  useEffect(() => {
    if (cRadars?.length > 0 && selectedChampionId) {
      const found = cRadars.find(
        (radar) => radar.championId === selectedChampionId
      );
      if (found) {
        setCRadar(found);
        return;
      }
    }
    if (!!selectedChampionId)
      setCRadar(getChampionRadarDto(selectedChampionId));
  }, [cRadars, selectedChampionId]);

  const handleMinMax = (value: string, prevValue: number) => {
    const num = Number(value);
    if (num >= 1 && num <= 5) return num;
    return prevValue;
  };

  const { mutate: saveRadar } = useSaveChampionRadarMutation();

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

            saveRadar({
              ...cRadar,
              championId: selectedChampionId,
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
                      onChange={(championId) => {
                        setSelectedChampionId(championId);
                        setFieldValue("championId", championId);
                      }}
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
                </Box>

                {cRadar !== null && (
                  <React.Fragment>
                    <ChampionRadar value={cRadar} showLabel={false} />
                    <Box position="relative">
                      <MyTextField
                        style={{
                          width: 75,
                          position: "absolute",
                          top: "-310px",
                          left: "160px",
                        }}
                        type="number"
                        label="Burst"
                        value={cRadar.burst}
                        onChange={(e) => {
                          setCRadar({
                            ...cRadar,
                            burst: handleMinMax(e.target.value, cRadar.burst),
                          });
                        }}
                      />
                      <MyTextField
                        style={{
                          width: 75,
                          position: "absolute",
                          top: -200,
                          right: -10,
                        }}
                        type="number"
                        label="Tankiness"
                        value={cRadar.tankiness}
                        onChange={(e) => {
                          setCRadar({
                            ...cRadar,
                            tankiness: handleMinMax(
                              e.target.value,
                              cRadar.tankiness
                            ),
                          });
                        }}
                      />
                      <MyTextField
                        style={{
                          width: 75,
                          position: "absolute",
                          top: -50,
                          right: 50,
                        }}
                        type="number"
                        label="Engage"
                        value={cRadar.engage}
                        onChange={(e) => {
                          setCRadar({
                            ...cRadar,
                            engage: handleMinMax(e.target.value, cRadar.engage),
                          });
                        }}
                      />
                      <MyTextField
                        style={{
                          width: 75,
                          position: "absolute",
                          top: -50,
                          right: 260,
                        }}
                        type="number"
                        label="Protect"
                        value={cRadar.protect}
                        onChange={(e) => {
                          setCRadar({
                            ...cRadar,
                            protect: handleMinMax(
                              e.target.value,
                              cRadar.protect
                            ),
                          });
                        }}
                      />
                      <MyTextField
                        style={{
                          width: 75,
                          position: "absolute",
                          bottom: 160,
                          right: 320,
                        }}
                        type="number"
                        label="DPS"
                        value={cRadar.dps}
                        onChange={(e) => {
                          setCRadar({
                            ...cRadar,
                            dps: handleMinMax(e.target.value, cRadar.dps),
                          });
                        }}
                      />
                    </Box>
                  </React.Fragment>
                )}
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
