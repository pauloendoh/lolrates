import Txt from "@/components/UI/Text/Txt";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useState } from "react";
import useLolRatesQuery from "../../../../hooks/react-query/domain/rates/useLolRatesQuery";
import { LolRateChampionDto } from "../../../../types/domain/rates/LolRateChampionDto";
import stringAreVerySimilar from "../../../../utils/text/stringsAreVerySimilar";
import { urls } from "../../../../utils/urls";
import FlexVCenter from "../../../UI/Flexboxes/FlexVCenter";
import MyTextField from "../../../UI/MyInputs/MyTextField";
import ChampionNameTableCell from "../ChampionNameTableCell/ChampionNameTableCell";
import ChampionTooltip from "../ChampionPickWinTooltip/ChampionPickWinTooltip";
import RatesUpdatedAt from "../RatesUpdatedAt/RatesUpdatedAt";
import S from "./LolRatesPageContent.styles";

type Roles = "ALL" | "TOP" | "JUNGLE" | "MID" | "BOT" | "SUP";
const rolesArr: Roles[] = ["ALL", "TOP", "JUNGLE", "MID", "BOT", "SUP"];

type SortDescBy = "AvgPick" | "AvgWin" | "AvgAvg";

// PE 1/3 - Change to LolRatesPageContent
const LolRatesPageContent = () => {
  const { rates: allChampionRates, updatedAt, isLoading } = useLolRatesQuery();

  const [checked51, setChecked51] = useState(false);

  // PE 2/3 - Should be on a separated component? Eg: <ChampionRateList rates={rates}/>
  const [selectedRole, setSelectedRole] = useState<Roles>("ALL");
  const [sortDescBy, setSortDescBy] = useState<SortDescBy>("AvgAvg");
  const [textFilter, setTextFilter] = useState("");

  const getFilteredRates = useCallback(() => {
    let filteredRates = [...allChampionRates];

    if (textFilter.trim().length > 0) {
      return filteredRates.filter((r) =>
        stringAreVerySimilar(textFilter, r.championName)
      );
    }

    // PE 1/3 - Separate into filterRates(rates, selectedRole, checked51, sortDescBy)
    if (selectedRole !== "ALL") {
      filteredRates = allChampionRates.filter(
        (rate) => rate.role === selectedRole
      );
    }

    if (checked51) {
      filteredRates = filteredRates.filter((r) => r.avgWin >= 51);
    }

    switch (sortDescBy) {
      case "AvgAvg":
        filteredRates = filteredRates.sort((a, b) => b.avgAvg - a.avgAvg);
        break;
      case "AvgPick":
        filteredRates = filteredRates.sort((a, b) => b.avgPick - a.avgPick);
        break;
      case "AvgWin":
        filteredRates = filteredRates.sort((a, b) => b.avgWin - a.avgWin);
    }

    return filteredRates;
  }, [allChampionRates, selectedRole, checked51, sortDescBy, textFilter]);

  const shouldShowRate = (rate: LolRateChampionDto) => {
    if (textFilter.trim().length > 0) {
      return stringAreVerySimilar(textFilter, rate.championName);
    }
    if (selectedRole === "ALL") return true;
    if (selectedRole === rate.role) return true;
    return false;
  };

  const classes = useStyles();

  return (
    <Box p={3}>
      <Typography variant="h3">LoL Rates</Typography>
      <Box>
        {/* PE 1/3 - componentize? */}
        <Txt>
          Average pick and win rates from{" "}
          <a href={urls.opgg} className={classes.link} target="_blank">
            OP.GG
          </a>
          ,{" "}
          <a href={urls.lolgraph} className={classes.link} target="_blank">
            LeagueOfGraphs
          </a>{" "}
          and{" "}
          <a href={urls.ugg} className={classes.link} target="_blank">
            U.GG
          </a>{" "}
          (Global Platinum+)
        </Txt>
      </Box>
      <Box mt={4}>
        <MyTextField
          id="text-filter"
          name="text-filter"
          value={textFilter}
          onChange={(e) => setTextFilter(e.target.value)}
          size="small"
          label={
            <S.SearchLabel>
              <FontAwesomeIcon icon={faSearch} />
              <span>Champion name</span>
            </S.SearchLabel>
          }
          className="mt-3"
        />
      </Box>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked51}
              onChange={(e) => setChecked51(e.target.checked)}
              name="avgWin51"
              color="primary"
            />
          }
          label="Only AvgWin >= 51%"
        />
      </Box>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <FlexVCenter mt={2} style={{ gap: 16 }}>
            {rolesArr.map((role) => (
              <Txt
                variant="h5"
                key={role}
                onClick={() => {
                  setSelectedRole(role);
                }}
                style={{
                  fontWeight: selectedRole === role ? "bold" : "normal",
                  textDecoration: selectedRole === role ? "underline" : "unset",
                  cursor: "pointer",
                }}
              >
                {role}
              </Txt>
            ))}
          </FlexVCenter>

          <Box mt={2} />
          <TableContainer style={{ width: 515, maxHeight: 500 }}>
            <Paper>
              <Table size="small" style={{ width: 500 }} stickyHeader>
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell>Champion</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setSortDescBy("AvgPick");
                        }}
                        style={{
                          textTransform: "none",
                          fontWeight:
                            sortDescBy === "AvgPick" ? "bold" : "normal",
                        }}
                      >
                        Pick
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setSortDescBy("AvgWin");
                        }}
                        style={{
                          textTransform: "none",
                          fontWeight:
                            sortDescBy === "AvgWin" ? "bold" : "normal",
                        }}
                      >
                        Win
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setSortDescBy("AvgAvg");
                        }}
                        style={{
                          textTransform: "none",
                          fontWeight:
                            sortDescBy === "AvgAvg" ? "bold" : "normal",
                        }}
                      >
                        (Pick+Win)/2
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getFilteredRates().map((rate, i) => (
                    <TableRow
                      key={i}
                      style={{
                        display: shouldShowRate(rate) ? "table-row" : "none",
                      }}
                    >
                      <ChampionNameTableCell rate={rate} />

                      <TableCell>
                        <ChampionTooltip
                          championRate={rate}
                          isHovering="Pick"
                        />
                      </TableCell>

                      <TableCell>
                        <ChampionTooltip championRate={rate} isHovering="Win" />
                      </TableCell>

                      <TableCell>
                        {rate.avgAvg > 0 ? rate.avgAvg.toFixed(1) + "%" : ""}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </TableContainer>
          {updatedAt && <RatesUpdatedAt updatedAt={updatedAt} />}
        </>
      )}
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  link: {
    color: "inherit",
    fontWeight: 600,
  },
  tableHead: {
    "& th": {
      background: "#2b2b2b",
    },
  },
}));

export default LolRatesPageContent;
