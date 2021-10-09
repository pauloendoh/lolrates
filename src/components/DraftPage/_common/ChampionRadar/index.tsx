import React from "react";
import {
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChampionRadarDto } from "../../../../types/domain/draft/ChampionRadarDto";
import Txt from "../../../_common/text/Txt";
import S from "./styles";

export default function ChampionRadar({
  values,
  showLabel,
}: {
  values: ChampionRadarDto;
  showLabel: boolean;
}) {
  const data = [
    {
      subject: "Burst",
      Value: values.burst,
    },
    {
      subject: "Tankiness",
      Value: values.tankiness,
    },
    {
      subject: "Engage",
      Value: values.engage,
    },
    {
      subject: "Protect",
      Value: values.protect,
    },
    {
      subject: "DPS",
      Value: values.dps,
    },
  ];

  return (
    <S.Root>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          {/* {showLabel && (
            <PolarAngleAxis dataKey="subject" tick={{ fill: "white" }} />
          )} */}
          <Tooltip />
          <PolarRadiusAxis />
          <Radar
            dataKey="Value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Radar dataKey="maxValue" fillOpacity={0} />
        </RadarChart>
      </ResponsiveContainer>
      {showLabel && (
        <S.FloatingLabelsWrapper>
          <Txt style={{ position: "absolute", top: -290, left: 160 }}>
            Burst: {values.burst}
          </Txt>

          <Txt style={{ position: "absolute", top: -200, right: -10 }}>
            Tankiness: {values.tankiness}
          </Txt>
          <Txt style={{ position: "absolute", top: -50, right: 70 }}>
            Engage: {values.engage}
          </Txt>
          <Txt style={{ position: "absolute", top: -50, right: 260 }}>
            Protect: {values.protect}
          </Txt>
          <Txt style={{ position: "absolute", top: -200, right: 310 }}>
            DPS: {values.dps}
          </Txt>
        </S.FloatingLabelsWrapper>
      )}
    </S.Root>
  );
}
