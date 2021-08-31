import { Box } from "@material-ui/core";
import React from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { ChampionRadarDto } from "../../../../types/domain/draft/ChampionRadarDto";

export default function ChampionRadar({ value, showLabel }: { value: ChampionRadarDto, showLabel: boolean }) {
  const data = [
    {
      subject: "Burst",
      Value: value.burst,
    },
    {
      subject: "Tankiness",
      Value: value.tankiness,
    },
    {
      subject: "Engage",
      Value: value.engage,
    },
    {
      subject: "Protect",
      Value: value.protect,
    },
    {
      subject: "DPS",
      Value: value.dps,
    },
  ];

  return (
    <Box width="375px" height="300px">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          {showLabel && <PolarAngleAxis  dataKey="subject" tick={{fill: 'white'}} />}
          <Tooltip/>
          <PolarRadiusAxis  />
          <Radar
            dataKey="Value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Radar dataKey="maxValue" fillOpacity={0} />
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  );
}
