import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter";
import { AramChampionWinRateDto } from "@/hooks/react-query/domain/aram-helper/types/AramChampionWinRateDto";
import { useMyAramChampionsQuery } from "@/hooks/react-query/domain/aram-helper/useMyAramChampionsQuery";
import useChampionsQuery from "@/hooks/react-query/domain/draft/useChampionsQuery";
import useAramHelperStore from "@/hooks/zustand-stores/domain/aram-helper/useAramHelperStore";
import { IconButton, TableCell, TableRow, Typography } from "@material-ui/core";
import { useMemo } from "react";
import { MdDelete } from "react-icons/md";

type Props = {
  championRate: AramChampionWinRateDto;
  index: number;
};

const AramChampionTableRow = ({ championRate, index }: Props) => {
  const {
    availableChampions,
    setAvailableChampions,
    selectedChampion,
    setSelectedChampion,
  } = useAramHelperStore();
  const { data: myChampions } = useMyAramChampionsQuery();
  const { data: champions } = useChampionsQuery();

  const myChampion = useMemo(() => {
    const champion = champions?.find(
      (x) => x.name === championRate.championName
    );
    if (!champion) return;
    return myChampions?.find((x) => x.championId === champion.id);
  }, [myChampions, championRate, champions]);

  return (
    <TableRow
      key={championRate.championName}
      onClick={() => {
        setSelectedChampion(championRate);
      }}
      style={{
        cursor: "pointer",
        backgroundColor:
          selectedChampion?.championName === championRate.championName
            ? "rgba(0, 0, 0)"
            : undefined,
      }}
    >
      <TableCell align="center">{index + 1}</TableCell>
      <TableCell>
        <FlexVCenter style={{ gap: 4 }}>
          <img
            src={championRate.iconUrl}
            alt={championRate.championName}
            width="24px"
            height="24px"
            style={{
              borderRadius: 24,
            }}
          />
          <Typography>{championRate.championName}</Typography>
        </FlexVCenter>
      </TableCell>
      <TableCell align="center">{championRate.aramWin} %</TableCell>
      <TableCell align="center">{myChampion?.fun || "?"}</TableCell>
      <TableCell>
        <IconButton
          size="small"
          onClick={() => {
            const updated = availableChampions.filter(
              (c) => c.championName !== championRate.championName
            );
            setAvailableChampions(updated);
          }}
        >
          <MdDelete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default AramChampionTableRow;
