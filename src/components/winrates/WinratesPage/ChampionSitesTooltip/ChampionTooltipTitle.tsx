import { LolRateChampionDto } from "@/types/domain/rates/LolRateChampionDto";
import { Box, Typography } from "@material-ui/core";
import { getLolGraphsUrl } from "../../../../utils/domain/rates/getLolGraphsUrl";
import { getOpggUrl } from "../../../../utils/domain/rates/getOpggUrl";
import { getChampionHistoryUrl } from "../../../../utils/domain/rates/getPatchHistoryUrl";
import { urls } from "../../../../utils/urls/urls";
import S from "./ChampionTooltipTitle.styles";

type Props = {
  rate: LolRateChampionDto | undefined;
};

const ChampionTooltipTitle = ({ rate }: Props) => {
  if (!rate) {
    return <span>No WR info</span>;
  }
  return (
    <S.Root>
      <Typography
        style={{
          fontSize: 12,
        }}
      >
        Average: {rate?.avgWin > 0 && rate?.avgWin.toFixed(1) + "%"}
      </Typography>

      <Box mt={2}>
        <a target="_blank" href={getOpggUrl(rate?.championName)}>
          op.gg: {rate?.opggWin > 0 && rate?.opggWin.toFixed(1) + "%"}
        </a>
        <br />

        <a target="_blank" href={getLolGraphsUrl(rate?.championName)}>
          lolgraphs:{" "}
          {rate?.lolgraphsWin > 0 && rate?.lolgraphsWin.toFixed(1) + "%"}
        </a>
        <br />
        <a target="_blank" href={urls.uggChampion(rate?.championName)}>
          u.gg: {rate?.uggWin > 0 && rate?.uggWin.toFixed(1) + "%"}
        </a>
      </Box>
      <Box mt={2}>
        <a target="_blank" href={getChampionHistoryUrl(rate?.championName)}>
          Patch history
        </a>
      </Box>
    </S.Root>
  );
};

export default ChampionTooltipTitle;
