import { GiFairyWand } from "react-icons/gi";

import { GiWolfTrap } from "react-icons/gi";

import { GiCrossbow, GiExplosionRays } from "react-icons/gi";

import { FaShieldHalved } from "react-icons/fa6";

import Flex from "@/components/_common/flexboxes/Flex";
import FlexCol from "@/components/_common/flexboxes/FlexCol";
import { useChampionRadarDialogStore } from "@/hooks/zustand-stores/dialogs/useChampionRadarDialogStore";
import { Box, Paper } from "@material-ui/core";
import { useMemo } from "react";
import useChampionRadarsQuery from "../../../../hooks/react-query/domain/draft/championRadar/useChampionRadarsQuery";
import useChampionsQuery from "../../../../hooks/react-query/domain/draft/useChampionsQuery";
import useSelectedChampionsStore from "../../../../hooks/zustand-stores/domain/draft/useSelectedChampionsStore";
import { ChampionDto } from "../../../../types/domain/draft/ChampionDto";
import { getChampionRadarDto } from "../../../../types/domain/draft/ChampionRadarDto";

export function ChampionRadarPopup() {
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

  // PE 1/3 - useMemo
  const radarValues = useMemo(() => {
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
  }, [selectedChampions, radars, allChampions]);

  const selectedChampionsHasFilledRadar = useMemo(() => {
    const infos = selectedChampions.map((selected) => {
      const champion = allChampions?.find(
        (ac) => selected.championName === ac.name
      );

      console.log({
        selectedChampions,
      });

      if (!champion) {
        return {
          championName: selected.championName,
          hasFilledRadar: false,
          role: selected.role,
        };
      }

      const radar = radars.find((r) => r.championId === champion.id);

      if (!radar) {
        return {
          championName: selected.championName,
          hasFilledRadar: false,
          role: selected.role,
        };
      }

      const hasFilledRadar =
        radar.burst > 1 ||
        radar.tankiness > 1 ||
        radar.dps > 1 ||
        radar.protect > 1 ||
        radar.engage > 1;

      return {
        championName: selected.championName,
        role: selected.role,
        hasFilledRadar: hasFilledRadar,
      };
    });

    return [
      infos.find((info) => info.role === "TOP"),
      infos.find((info) => info.role === "JUNGLE"),
      infos.find((info) => info.role === "MID"),
      infos.find((info) => info.role === "BOT"),
      infos.find((info) => info.role === "SUP"),
    ].filter((info) => info);
  }, [selectedChampions, allChampions, radars]);

  const sortedValues = useMemo(() => {
    const values = [
      {
        icon: GiCrossbow,
        label: "DPS",
        value: radarValues.dps,
      },
      {
        icon: GiExplosionRays,
        label: "Burst",
        value: radarValues.burst,
      },
      {
        icon: FaShieldHalved,
        label: "Tankiness",
        value: radarValues.tankiness,
      },
      {
        icon: GiWolfTrap,
        label: "Engage",
        value: radarValues.engage,
      },
      {
        icon: GiFairyWand,
        label: "Protect",
        value: radarValues.protect,
      },
    ];

    values.sort((a, b) => b.value - a.value);

    return values;
  }, [radarValues]);

  const { openDialog } = useChampionRadarDialogStore();

  if (!selectedChampionsHasFilledRadar.length) return null;

  return (
    <Box
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        cursor: "pointer",
      }}
      onClick={() => {
        openDialog(radarValues);
      }}
    >
      <Paper
        style={{
          padding: 16,
          background: "#202020",
        }}
      >
        <FlexCol
          style={{
            gap: 8,
          }}
        >
          <Flex
            style={{
              gap: 8,
            }}
          >
            {selectedChampionsHasFilledRadar.map((item, i) => (
              <span
                key={item.championName}
                style={{
                  color: item.hasFilledRadar ? "unset" : "red",
                }}
              >
                {item.championName}
              </span>
            ))}
          </Flex>
          <FlexCol>
            {sortedValues.map((value, i) => (
              <Flex key={value.label} style={{ gap: 8 }}>
                <span>{value.value}</span>
                <span>{value.label}</span>
              </Flex>
            ))}
          </FlexCol>
        </FlexCol>
      </Paper>
    </Box>
  );
}
