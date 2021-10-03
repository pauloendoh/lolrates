import { TableCell, Tooltip } from "@material-ui/core";
import React from "react";
import { LolRateChampionDto } from "../../../../types/domain/rates/LolRateChampionDto";
import ChampionTooltipTitle from "../ChampionTooltipTitle/ChampionTooltipTitle";
import S from "./ChampionNameTableCell.styles";

const ChampionNameTableCell = ({ rate }: { rate: LolRateChampionDto }) => {
  return (
    <TableCell>
      <Tooltip
        interactive
        title={<ChampionTooltipTitle championName={rate.championName} />}
      >
        <S.TooltipHovearable>
          <img src={rate.iconUrl} style={{ width: 30, borderRadius: 100 }} />
          <S.ChampionNameRole>
            <span style={{ textDecoration: "underline" }}>
              {rate.championName}
            </span>
            <i style={{ fontSize: "smaller" }}>{rate.role}</i>
          </S.ChampionNameRole>
        </S.TooltipHovearable>
      </Tooltip>
    </TableCell>
  );
};

export default ChampionNameTableCell;
