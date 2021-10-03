import { Box, Tooltip } from "@material-ui/core";
import React from "react";
import { LolRateChampionDto } from "../../../../types/domain/rates/LolRateChampionDto";
import { getLolGraphsUrl } from "../../../../utils/domain/rates/getLolGraphsUrl";
import { getOpggUrl } from "../../../../utils/domain/rates/getOpggUrl";
import { getPatchHistoryUrl } from "../../../../utils/domain/rates/getPatchHistoryUrl";
import { urls } from "../../../../utils/urls";
import S from "./ChampionPickWinTooltip.styles";

const ChampionTooltip = ({
  championRate,
  isHovering,
}: {
  championRate: LolRateChampionDto;
  isHovering: "Pick" | "Win";
}) => {
  const keys = {
    opgg: `opgg${isHovering}`,
    lolgraphs: `lolgraphs${isHovering}`,
    ugg: `ugg${isHovering}`,
    avg: `avg${isHovering}`,
  };

  return (
    <Tooltip
      interactive
      title={
        <S.TooltipContent>
          <a target="_blank" href={getOpggUrl(championRate.championName)}>
            op.gg:{" "}
            {championRate[keys.opgg] > 0 &&
              championRate[keys.opgg].toFixed(1) + "%"}
          </a>
          <a target="_blank" href={getLolGraphsUrl(championRate.championName)}>
            lolgraphs:{" "}
            {championRate[keys.lolgraphs] > 0 &&
              championRate[keys.lolgraphs].toFixed(1) + "%"}
          </a>
          <a target="_blank" href={urls.uggChampion(championRate.championName)}>
            u.gg:{" "}
            {championRate[keys.ugg] > 0 &&
              championRate[keys.ugg].toFixed(1) + "%"}
          </a>
          <Box mt={2}>
            <a
              target="_blank"
              href={getPatchHistoryUrl(championRate.championName)}
            >
              Patch history
            </a>
          </Box>
        </S.TooltipContent>
      }
    >
      <S.TextButton isHovering={isHovering}>
        {championRate[keys.avg] > 0 && championRate[keys.avg].toFixed(1) + "%"}
      </S.TextButton>
    </Tooltip>
  );
};

export default ChampionTooltip;
