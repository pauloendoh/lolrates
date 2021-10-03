import { Box } from "@material-ui/core";
import React from "react";
import { getLolGraphsUrl } from "../../../../utils/domain/rates/getLolGraphsUrl";
import { getOpggUrl } from "../../../../utils/domain/rates/getOpggUrl";
import { getPatchHistoryUrl } from "../../../../utils/domain/rates/getPatchHistoryUrl";
import { urls } from "../../../../utils/urls";
import S from './ChampionTooltipTitle.styles';

const ChampionTooltipTitle = ({ championName }: { championName: string }) => {
  return (
    <S.Root>
      <a target="_blank" href={getOpggUrl(championName)}>
        op.gg
      </a>
      <a target="_blank" href={getLolGraphsUrl(championName)}>
        lolgraphs
      </a>
      <a target="_blank" href={urls.uggChampion(championName)}>
        u.gg
      </a>
      <Box mt={2}>
        <a target="_blank" href={getPatchHistoryUrl(championName)}>
          Patch history
        </a>
      </Box>
    </S.Root>
  );
};

export default ChampionTooltipTitle;
