import { Box, TableCell, Tooltip } from "@material-ui/core";
import { LolRateChampionDto } from "../../../../types/domain/rates/LolRateChampionDto";
import ChampionTooltipTitle from "../ChampionSitesTooltip/ChampionTooltipTitle";
import S from "./styles";

const ChampionInfo1stTD = ({ rate }: { rate: LolRateChampionDto }) => {
  return (
    <TableCell>
      <Tooltip interactive title={<ChampionTooltipTitle rate={rate} />}>
        <S.TooltipHovearable>
          <img src={rate.iconUrl} style={{ width: 30, borderRadius: 100 }} />
          <Box ml={1}>
            <span style={{ textDecoration: "underline" }}>
              {rate.championName}
            </span>
            <div>
              <i style={{ fontSize: "smaller" }}>{rate.role}</i>
            </div>
          </Box>
        </S.TooltipHovearable>
      </Tooltip>
    </TableCell>
  );
};

export default ChampionInfo1stTD;
