import FlexCol from "@/components/_common/flexboxes/FlexCol";
import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter";
import { AramChampionWinRateDto } from "@/hooks/react-query/domain/aram-helper/types/AramChampionWinRateDto";
import { useMyAramChampionsQuery } from "@/hooks/react-query/domain/aram-helper/useMyAramChampionsQuery";
import useChampionsQuery from "@/hooks/react-query/domain/draft/useChampionsQuery";
import useAramHelperStore from "@/hooks/zustand-stores/domain/aram-helper/useAramHelperStore";
import {
  IconButton,
  LinearProgress,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useMemo } from "react";
import { MdDelete } from "react-icons/md";

type Props = {
  championRate: AramChampionWinRateDto;
  index: number;
  highestPlayedCount: number;
};

const AramChampionTableRow = ({
  championRate: aramChampion,
  ...props
}: Props) => {
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
      (x) => x.name === aramChampion.championName
    );
    if (!champion) return;
    return myChampions?.find((x) => x.championId === champion.id);
  }, [myChampions, aramChampion, champions]);

  const normalisePlayed = (value: number) =>
    ((value - 0) * 100) / (props.highestPlayedCount - 0);

  const normalizedWinRate = (value: number) => ((value - 0) * 100) / (100 - 0);

  return (
    <TableRow
      onClick={() => {
        setSelectedChampion(aramChampion);
      }}
      style={{
        cursor: "pointer",
        backgroundColor:
          selectedChampion?.championName === aramChampion.championName
            ? "rgba(0, 0, 0)"
            : undefined,
      }}
    >
      <TableCell>
        <FlexVCenter style={{ gap: 4 }}>
          <img
            src={aramChampion.iconUrl}
            alt={aramChampion.championName}
            width="24px"
            height="24px"
            style={{
              borderRadius: 24,
            }}
          />
          <Typography>{aramChampion.championName}</Typography>
        </FlexVCenter>
      </TableCell>
      <TableCell align="center">{aramChampion.aramWin} %</TableCell>
      <TableCell>
        <FlexCol>
          <LinearProgress
            variant="determinate"
            value={normalisePlayed(aramChampion.myPlayedCount)}
          />
          {aramChampion.myPlayedCount}
        </FlexCol>
      </TableCell>
      <TableCell>
        <FlexCol>
          <LinearProgress
            variant="determinate"
            value={normalizedWinRate(aramChampion.myWinRate)}
            color="secondary"
          />
          {aramChampion.myWinRate}%
        </FlexCol>
      </TableCell>

      <TableCell align="right">
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            const updated = availableChampions.filter(
              (c) => c.championName !== aramChampion.championName
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
