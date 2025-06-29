import ChampionRadar from "@/components/draft/DraftPage/_common/ChampionRadar";
import { spacing } from "@/utils/theme";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import useChampionRadarsQuery from "../../../../../../../hooks/react-query/domain/draft/championRadar/useChampionRadarsQuery";
import useSaveChampionRadarMutation from "../../../../../../../hooks/react-query/domain/draft/championRadar/useSaveChampionRadarMutation";
import useSavePlayerChampionMutation from "../../../../../../../hooks/react-query/domain/draft/playerChampion/useSavePlayerChampionMutation";
import useChampionsQuery from "../../../../../../../hooks/react-query/domain/draft/useChampionsQuery";
import {
  ChampionRadarDto,
  getChampionRadarDto,
} from "../../../../../../../types/domain/draft/ChampionRadarDto";
import { PlayerChampionDto } from "../../../../../../../types/domain/draft/PlayerChampionDto";
import SaveCancelButtons from "../../../../../../_common/buttons/SaveCancelButton/SaveCancelButtons";
import MyTextField from "../../../../../../_common/inputs/MyTextField";
import SelectChampionAtRow from "../../_common/SelectChampionAtRow/SelectChampionAtRow";
import S from "./PlayerChampionDialog.styles";
import RoleSelector from "./RoleSelector/RoleSelector";
import SkillLevelSelector from "./SkillLevelSelector/SkillLevelSelector";

const PlayerChampionDialog = (props: {
  open: boolean;
  initialValue: PlayerChampionDto;
  onClose: () => void;
}) => {
  const { mutate: saveChampion, isLoading } = useSavePlayerChampionMutation();

  const { data: champions } = useChampionsQuery();

  const { data: cRadars } = useChampionRadarsQuery();

  const [cRadar, setCRadar] = useState<ChampionRadarDto>(null);
  const [selectedChampionId, setSelectedChampionId] = useState<number>(null);

  const championNameRef = React.useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (props.initialValue?.championId) {
      setSelectedChampionId(props.initialValue.championId);
    } else setSelectedChampionId(null);
  }, [props.initialValue]);

  useEffect(() => {
    if (props.open) {
      setTimeout(() => {
        championNameRef.current?.focus();
      }, 100);
    }
  }, [props.open]);

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

  const onSubmit = (formikValues) => {
    saveChampion(formikValues, {
      onSettled: () => {
        props.onClose();
      },
    });

    saveRadar({
      ...cRadar,
      championId: selectedChampionId,
    });
  };

  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      fullWidth
      maxWidth="sm"
      aria-labelledby="auth-dialog"
      style={{ padding: spacing(1), paddingTop: 0 }}
    >
      <Formik
        enableReinitialize
        initialValues={props.initialValue}
        onSubmit={(formikValues) => {
          console.log({
            formikValues,
          });
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
        {({ values, setFieldValue }) => (
          <Form>
            <DialogTitle id="champion-dialog-title">
              Edit player champion
            </DialogTitle>
            <DialogContent>
              <S.SelectorLine>
                {champions?.length > 0 && (
                  <SelectChampionAtRow
                    ref={championNameRef}
                    championOptions={champions}
                    onChange={(championId) => {
                      setSelectedChampionId(championId);
                      setFieldValue("championId", championId);
                    }}
                    selectedChampionId={values.championId}
                    width="182px"
                  />
                )}

                <RoleSelector
                  selectedRole={values.role}
                  onChange={(role) => setFieldValue("role", role)}
                />
                <SkillLevelSelector
                  selectedLevel={values.skillLevel}
                  onChange={(level) => setFieldValue("skillLevel", level)}
                />
              </S.SelectorLine>

              {cRadar !== null && (
                <S.ChampionRadarWrapper>
                  <ChampionRadar values={cRadar} showLabel={false} />

                  <S.RadarInputsWrapper>
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
                          protect: handleMinMax(e.target.value, cRadar.protect),
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
                  </S.RadarInputsWrapper>
                </S.ChampionRadarWrapper>
              )}

              <MyTextField
                fullWidth
                multiline
                minRows={3}
                label="Notes"
                value={values.notes}
                onChange={(e) => {
                  setFieldValue("notes", e.target.value);
                }}
              />
            </DialogContent>
            <DialogTitle>
              <SaveCancelButtons
                disabled={isLoading}
                onCancel={props.onClose}
                onEnabledAndCtrlEnter={() => {
                  console.log(values);
                  onSubmit(values);
                }}
              />
            </DialogTitle>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default PlayerChampionDialog;
