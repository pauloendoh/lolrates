import Flex from "@/components/_common/flexboxes/Flex";
import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter";
import { useAramChampionsWinRatesQuery } from "@/hooks/react-query/domain/aram-helper/useAramChampionsWinRatesQuery";
import useAramHelperStore from "@/hooks/zustand-stores/domain/aram-helper/useAramHelperStore";
import { pushOrReplace } from "@/utils/pushOrReplace";
import {
  Box,
  Container,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import "draft-js/dist/Draft.css";
import AramChampionTableRow from "./AramChampionTableRow/AramChampionTableRow";
import SelectedChampionPaper from "./SelectedChampionPaper/SelectedChampionPaper";

export default function AramUtilsPage() {
  const { data } = useAramChampionsWinRatesQuery();

  const { availableChampions, setAvailableChampions, selectedChampion } =
    useAramHelperStore();

  return (
    <Container>
      <Typography variant="h4">ARAM Helper</Typography>

      <Flex
        mt={2}
        style={{
          gap: 24,
        }}
      >
        <Paper style={{ maxWidth: 440 }}>
          <Box p={2}>
            <Typography>Available champions</Typography>

            <FormControl fullWidth size="small">
              <Select
                variant="outlined"
                labelId="demo-select-small"
                id="demo-select-small"
                onChange={(e) => {
                  const selectedChampion = data?.find(
                    (champion) => champion.championName === e.target.value
                  );
                  const updated = pushOrReplace(
                    availableChampions,
                    selectedChampion,
                    "championName"
                  );
                  setAvailableChampions(updated);
                }}
              >
                {data?.map((champion) => (
                  <MenuItem
                    key={champion.championName}
                    value={champion.championName}
                  >
                    <FlexVCenter
                      style={{
                        gap: 4,
                      }}
                    >
                      <img
                        src={champion.iconUrl}
                        alt={champion.championName}
                        width="24px"
                        height="24px"
                        style={{
                          borderRadius: 24,
                        }}
                      />
                      <Typography>
                        {champion.championName} {champion.aramWin}%
                      </Typography>
                    </FlexVCenter>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box mt={2} />
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center" width="24px">
                    #
                  </TableCell>
                  <TableCell>Champion</TableCell>
                  <TableCell align="center">OP.GG WR</TableCell>
                  <TableCell align="center">Fun</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {availableChampions.map((champion, index) => (
                  <AramChampionTableRow
                    key={champion.championName}
                    championRate={champion}
                    index={index}
                  />
                ))}
              </TableBody>
            </Table>
          </Box>
        </Paper>

        <SelectedChampionPaper />
      </Flex>
    </Container>
  );
}
