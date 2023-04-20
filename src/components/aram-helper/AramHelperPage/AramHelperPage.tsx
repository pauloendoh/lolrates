import Flex from "@/components/_common/flexboxes/Flex";
import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter";
import MyTextField from "@/components/_common/inputs/MyTextField";
import { useAramChampionsWinRatesQuery } from "@/hooks/react-query/domain/aram-helper/useAramChampionsWinRatesQuery";
import useAramHelperStore from "@/hooks/zustand-stores/domain/aram-helper/useAramHelperStore";
import { pushOrReplace } from "@/utils/pushOrReplace";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import "draft-js/dist/Draft.css";
import AramChampionTableRow from "./AramChampionTableRow/AramChampionTableRow";
import SelectedChampionSection from "./SelectedChampionSection/SelectedChampionSection";

export default function AramUtilsPage() {
  const { data } = useAramChampionsWinRatesQuery();

  const {
    availableChampions,
    setAvailableChampions,
    selectedChampion,
    setSelectedChampion,
  } = useAramHelperStore();

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

            <Autocomplete
              options={data?.map((champion) => champion.championName) ?? []}
              value={selectedChampion?.championName}
              onChange={(e, value) => {
                const selectedAramChampion = data?.find(
                  (champion) => champion.championName === value
                );

                if (!selectedAramChampion) return;
                const updated = pushOrReplace(
                  availableChampions,
                  selectedAramChampion,
                  "championName"
                );
                setAvailableChampions(updated);
                setSelectedChampion(selectedAramChampion);
              }}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  label="Champion"
                  variant="outlined"
                  size="small"
                  style={{
                    marginTop: 16,
                  }}
                />
              )}
              renderOption={(option) => {
                const champion = data?.find(
                  (champion) => champion.championName === option
                );
                return (
                  <FlexVCenter
                    style={{
                      gap: 4,
                    }}
                  >
                    <img
                      src={champion?.iconUrl}
                      alt={champion?.championName}
                      width="24px"
                      height="24px"
                      style={{
                        borderRadius: 24,
                      }}
                    />
                    <Typography>
                      {champion?.championName} {champion?.aramWin}%
                    </Typography>
                  </FlexVCenter>
                );
              }}
            />

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

        <SelectedChampionSection />
      </Flex>
    </Container>
  );
}
