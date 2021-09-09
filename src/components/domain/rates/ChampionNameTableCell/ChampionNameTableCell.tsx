import { Box, TableCell, Tooltip } from "@material-ui/core";
import React from "react";
import { LolRateChampionDto } from "../../../../types/domain/rates/LolRateChampionDto";
import ChampionTooltipTitle from "../ChampionTooltipTitle";

const ChampionNameTableCell = ({ rate }: { rate: LolRateChampionDto }) => {
  return (
    <TableCell>
      <Tooltip interactive title={<ChampionTooltipTitle  championName={rate.championName}/>}>
        <Box
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <Box>
            <img src={rate.iconUrl} style={{ width: 30, borderRadius: 100 }} />
          </Box>

          <Box style={{ marginLeft: 8 }}>
            <Box style={{textDecoration: "underline"}}>{rate.championName}</Box>
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
