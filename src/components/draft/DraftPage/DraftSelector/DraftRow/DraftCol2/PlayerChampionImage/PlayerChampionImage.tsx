import FlexCenter from "@/components/_common/flexboxes/FlexCenter";
import ChampionTooltipTitle from "@/components/winrates/WinratesPage/ChampionSitesTooltip/ChampionTooltipTitle";
import { Box, Tooltip } from "@material-ui/core";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useQueryChampionById } from "../../../../../../../hooks/react-query/domain/draft/useChampionsQuery";
import { useChampionRateQuery } from "../../../../../../../hooks/react-query/domain/rates/useLolRatesQuery";
import { PlayerChampionDto } from "../../../../../../../types/domain/draft/PlayerChampionDto";
import { ChampionRoleType } from "../../../../../../../types/domain/rates/ChampionRoleType";
import { getChampionImageBorder } from "../../../../../../../utils/domain/rates/getChampionImageBorder";
import theme from "../../../../../../../utils/theme";

// PE 2/3
const PlayerChampionImage = (props: {
  pChampion: PlayerChampionDto;
  role: ChampionRoleType;
  onClick: (id: number) => void;
  onClickEditChampion: (id: number) => void;
  onClickDelete: (championId: number) => void;
}) => {
  const champion = useQueryChampionById(props.pChampion.championId);
  const championRate = useChampionRateQuery(champion.name, props.role);

  const [hover, setHover] = useState(false);

  if (!champion) return null;

  return (
    <Tooltip
      enterDelay={500}
      enterNextDelay={500}
      interactive
      title={<ChampionTooltipTitle rate={championRate} />}
    >
      <Box
        style={{
          position: "relative",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img
          alt={champion.name}
          src={champion.iconUrl}
          onClick={() => props.onClick(props.pChampion.championId)}
          style={{
            width: 32,
            borderRadius: 100,
            border: championRate
              ? getChampionImageBorder(championRate.avgWin)
              : "none",
            cursor: "pointer",
          }}
        />

        {hover && (
          <>
            <FlexCenter
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                cursor: "pointer",
                width: 16,
                height: 16,
                borderRadius: 100,
                backgroundColor: theme.palette.grey[900],
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: `1px solid ${theme.palette.grey[500]}`,
              }}
              onClick={() => props.onClickDelete(props.pChampion.id)}
            >
              <MdDelete fontSize={10} />
            </FlexCenter>

            <FlexCenter
              style={{
                position: "absolute",
                bottom: -4,
                right: -4,
                cursor: "pointer",
                width: 16,
                height: 16,
                borderRadius: 100,
                backgroundColor: theme.palette.grey[900],
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: `1px solid ${theme.palette.grey[500]}`,
              }}
              onClick={() =>
                props.onClickEditChampion(props.pChampion.championId)
              }
            >
              <MdEdit fontSize={10} />
            </FlexCenter>
          </>
        )}
      </Box>
    </Tooltip>
  );
};

export default PlayerChampionImage;
