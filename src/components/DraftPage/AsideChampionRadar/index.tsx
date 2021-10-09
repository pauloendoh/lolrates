import React, { useMemo } from "react";
import useChampionRadarsQuery from "../../../hooks/react-query/domain/draft/championRadar/useChampionRadarsQuery";
import useChampionsQuery from "../../../hooks/react-query/domain/draft/useChampionsQuery";
import useSelectedChampionsStore from "../../../hooks/zustand-stores/domain/draft/useSelectedChampionsStore";
import { ChampionDto } from "../../../types/domain/draft/ChampionDto";
import { getChampionRadarDto } from "../../../types/domain/draft/ChampionRadarDto";
import ChampionRadar from "../_common/ChampionRadar/ChampionRadar";
import S from "./styles";

export default function AsideChampionRadar() {
  const { data: radars } = useChampionRadarsQuery();

  const { selectedChampions } = useSelectedChampionsStore();
  const { data: allChampions } = useChampionsQuery();

  const championsWithRadar = useMemo(() => {
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
  }, [selectedChampions, radars]);

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
    <S.Root>
      {championsWithRadar.length > 0 && getTotalRadar() && (
        <>
          <ChampionRadar showLabel values={getTotalRadar()} />
          {championsWithRadar.map((champion) => (
            <span key={champion.id}>{champion.name}</span>
          ))}
        </>
      )}
    </S.Root>
  );
}
