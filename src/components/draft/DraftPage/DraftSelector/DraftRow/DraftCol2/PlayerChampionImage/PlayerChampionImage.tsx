import ChampionTooltipTitle from "@/components/index/WinratesPage/ChampionSitesTooltip";
import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@material-ui/core";
import React, { useState } from "react";
import { useQueryChampionById } from "../../../../../../../hooks/react-query/domain/draft/useChampionsQuery";
import { useChampionRateQuery } from "../../../../../../../hooks/react-query/domain/rates/useLolRatesQuery";
import { PlayerChampionDto } from "../../../../../../../types/domain/draft/PlayerChampionDto";
import { ChampionRoleType } from "../../../../../../../types/domain/rates/ChampionRoleType";
import { getChampionImageBorder } from "../../../../../../../utils/domain/rates/getChampionImageBorder";
import theme from "../../../../../../../utils/theme";
import S from "./PlayerChampionImage.styles";

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
      title={<ChampionTooltipTitle championName={champion.name} />}
    >
      <S.ChampionImgWrapper
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img
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
            <S.DeleteIconWrapper
              onClick={() => props.onClickDelete(props.pChampion.id)}
            >
              <FontAwesomeIcon
                icon={faTimes}
                fontSize="8px"
                color={theme.palette.grey[900]}
              />
            </S.DeleteIconWrapper>

            <S.EditIconWrapper
              onClick={() =>
                props.onClickEditChampion(props.pChampion.championId)
              }
            >
              <FontAwesomeIcon
                icon={faPen}
                size="sm"
                color={theme.palette.grey[900]}
              />
            </S.EditIconWrapper>
          </>
        )}
      </S.ChampionImgWrapper>
    </Tooltip>
  );
};

export default PlayerChampionImage;
