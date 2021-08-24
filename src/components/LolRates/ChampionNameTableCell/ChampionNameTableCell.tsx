import { Box, makeStyles, TableCell, Tooltip } from "@material-ui/core";
import React from "react";
import { ILolRateChampion } from "../../../types/LolRate/ILolRateChampion";
import { getLolGraphsUrl } from "../../../utils/domain/rates/getLolGraphsUrl";
import { getOpggUrl } from "../../../utils/domain/rates/getOpggUrl";
import { getPatchHistoryUrl } from "../../../utils/domain/rates/getPatchHistoryUrl";
import { getUggUrl } from "../../../utils/domain/rates/getUggUrl";
import ChampionTooltipTitle from "../../domain/rates/ChampionTooltipTitle";
import Flex from "../../Shared/Flexboxes/Flex";
import ChampionTooltip from "../ChampionPickWinTooltip/ChampionPickWinTooltip";

const ChampionNameTableCell = ({ rate }: { rate: ILolRateChampion }) => {
  return (
    <TableCell>
      <Tooltip interactive
      title={<ChampionTooltipTitle rate={rate} />}>
        <Box
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <Box>
            <img src={rate.iconUrl} style={{ width: 30, borderRadius: 100 }} />
          </Box>

          <Box style={{ marginLeft: 8 }}>
            <Box>{rate.championName}</Box>
            <Box style={{ fontSize: "smaller" }}>
              <i>{rate.role}</i>
            </Box>
          </Box>
        </Box>
      </Tooltip>
    </TableCell>
  );
};

export default ChampionNameTableCell;
