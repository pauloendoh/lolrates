import { Box } from "@material-ui/core";
import { getLolGraphsUrl } from "../../../../utils/domain/rates/getLolGraphsUrl";
import { getOpggUrl } from "../../../../utils/domain/rates/getOpggUrl";
import { getChampionHistoryUrl } from "../../../../utils/domain/rates/getPatchHistoryUrl";
import { urls } from "../../../../utils/urls/urls";
import S from "./styles";

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
        <a target="_blank" href={getChampionHistoryUrl(championName)}>
          Patch history
        </a>
      </Box>
    </S.Root>
  );
};

export default ChampionTooltipTitle;
