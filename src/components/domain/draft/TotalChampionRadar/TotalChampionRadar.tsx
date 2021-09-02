import { Box } from "@material-ui/core";
import React from "react";
import useChampionRadarsQuery from "../../../../hooks/domain/championRadar/useChampionRadarsQuery";
import useChampionsQuery from "../../../../hooks/react-query/auth/useChampionsQuery";
import useSelectedChampionsStore from "../../../../hooks/stores/domain/draft/useSelectedChampionsStore";
import { getChampionRadarDto } from "../../../../types/domain/draft/ChampionRadarDto";
import { ChampionDto } from "../../../../types/domain/general/ChampionDto";
import ChampionRadar from "../ChampionRadar/ChampionRadar";

export default function TotalChampionRadar() {
  const { data: radars } = useChampionRadarsQuery();

  const { selectedChampions } = useSelectedChampionsStore();
  const { data: allChampions } = useChampionsQuery();

  const reduceSum = (numbers: number[]) => {};

  const getChampionsWithRadar = () => {
    let championSet = new Set<ChampionDto>();

    if (radars?.length > 0 && allChampions?.length > 0) {
      for (const rate of selectedChampions) {
        const champion = allChampions.find((c) => c.name === rate.championName);

        const radar = radars.find((r) => r.championId === champion.id);
        if (radar) {
          championSet.add(champion);
        }
      }
    }

    return Array.from(championSet);
  };

  const getTotalRadar = () => {
    let totalBurst = 0;
    let totalTankiness = 0;
    let totalDPS = 0;
    let totalProtect = 0;
    let totalEngage = 0;

    const radar = getChampionRadarDto(null);

    if (radars?.length > 0 && allChampions?.length > 0) {
      for (const rate of selectedChampions) {
        const champion = allChampions.find((c) => c.name === rate.championName);

        const radar = radars.find((r) => r.championId === champion.id);
        if (radar) {
          totalBurst += radar.burst;
          totalTankiness += radar.tankiness;
          totalDPS += radar.dps;
          totalProtect += radar.protect;
          totalEngage += radar.engage;
        }
      }
    }

    radar.burst = totalBurst;
    radar.tankiness = totalTankiness;
    radar.dps = totalDPS;
    radar.protect = totalProtect;
    radar.engage = totalEngage;

    return radar;
  };

  return (
    <Box width="375px" height="300px">
      {getTotalRadar() && <ChampionRadar showLabel values={getTotalRadar()} />}
      {getChampionsWithRadar().map((champion) => (
        <Box key={champion.id}>{champion.name}</Box>
      ))}
    </Box>
  );
}
