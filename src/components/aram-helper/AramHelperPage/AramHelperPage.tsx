import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter";
import MyTextField from "@/components/_common/inputs/MyTextField";
import { useAramChampionsWinRatesQuery } from "@/hooks/react-query/domain/aram-helper/useAramChampionsWinRatesQuery";
import useAramHelperStore from "@/hooks/zustand-stores/domain/aram-helper/useAramHelperStore";
import { pushOrReplace } from "@/utils/pushOrReplace";
import {
  Box,
  Container,
  Grid,
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
import Head from "next/head";
import { useMemo } from "react";
import AramChampionTableRow from "./AramChampionTableRow/AramChampionTableRow";
import LolGraphsInput from "./LolGraphsInput/LolGraphsInput";
import SelectedChampionSection from "./SelectedChampionSection/SelectedChampionSection";

export default function AramUtilsPage() {
  const { data } = useAramChampionsWinRatesQuery();

  const { availableChampions, setAvailableChampions, setSelectedChampion } =
    useAramHelperStore();

  const sortedVisibleChampions = useMemo(() => {
    return availableChampions.sort((a, b) => {
      if (a.myPlayedCount > b.myPlayedCount) return -1;
      return 1;
    });
  }, [availableChampions]);

  const highestPlayedCount = useMemo(
    () =>
      data?.reduce((acc, curr) => {
        if (curr.myPlayedCount > acc) return curr.myPlayedCount;
        return acc;
      }, 0) || 0,
    [data]
  );

  return (
    <Container>
      <Head>
        <title>Aram Helper</title>
      </Head>

      <Typography variant="h4">ARAM Helper</Typography>

      <Box mt={3} />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper>
            <Box p={2}>
              <LolGraphsInput />

              <Typography style={{ marginTop: 16 }}>
                Available champions
              </Typography>

              <Autocomplete
                options={data?.map((champion) => champion.championName) ?? []}
                // value={selectedChampion?.championName}
                value={""}
                clearOnBlur
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
              {availableChampions.length > 0 && (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell width="160px">Champion</TableCell>
                      <TableCell width="120px" align="center">
                        OP.GG WR
                      </TableCell>
                      <TableCell width="100px">My played</TableCell>
                      <TableCell width="100px">My WR</TableCell>

                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedVisibleChampions.map((champion, index) => (
                      <AramChampionTableRow
                        highestPlayedCount={highestPlayedCount}
                        key={champion.championName}
                        championRate={champion}
                        index={index}
                      />
                    ))}
                  </TableBody>
                </Table>
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <SelectedChampionSection />
        </Grid>
      </Grid>
    </Container>
  );
}
