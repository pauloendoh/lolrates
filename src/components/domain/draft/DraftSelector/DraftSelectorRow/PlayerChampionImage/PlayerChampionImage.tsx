import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@material-ui/core";
import React, { useState } from "react";
import theme from "../../../../../../consts/theme";
import useChampionsQuery from "../../../../../../hooks/react-query/auth/useChampionsQuery";
import { PlayerChampionDto } from "../../../../../../types/domain/draft/PlayerChampionDto";
import FlexVCenter from "../../../../../Shared/Flexboxes/FlexVCenter";

// PE 2/3
const PlayerChampionImage = (props: {
  pChampion: PlayerChampionDto;
  onClickDelete: (id: number) => void;
}) => {
  const { data: allChampions } = useChampionsQuery();

  const getChampionById = (id: number) => {
    if (allChampions?.length) {
      return allChampions.find((c) => c.id === id);
    }
    return null;
  };

  const [hover, setHover] = useState(false);

  if (!getChampionById(props.pChampion.championId)) return null;

  return (
    <Box
      position="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={getChampionById(props.pChampion.championId).iconUrl}
        style={{
          width: 32,
          borderRadius: 100,
          // border: getBorder(championRate.avgWin),
          cursor: "pointer",
        }}
      />
      {hover && (
        <FlexVCenter
          position="absolute"
          width={14}
          height={14}
          bgcolor="white"
          justifyContent="center"
          right={0}
          top={0}
          borderRadius={14}
          style={{ cursor: "pointer" }}
          onClick={() => props.onClickDelete(props.pChampion.id)}
        >
          <FontAwesomeIcon icon={faTimes} color={theme.palette.grey[900]} />
        </FlexVCenter>
      )}
    </Box>
  );
};

export default PlayerChampionImage;
