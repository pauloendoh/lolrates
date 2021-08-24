import {
  Box,
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { urls } from "../../consts/urls";
import useChampionsQuery from "../../hooks/react-query/auth/useChampionsQuery";
import stringAreVerySimilar from "../../utils/text/stringsAreVerySimilar";
import MyTextField from "../Shared/MyInputs/MyTextField";
import Txt from "../Shared/Text/Txt";
import ChampionNameTableCell from "./ChampionNameTableCell/ChampionNameTableCell";
import ChampionTooltip from "./ChampionPickWinTooltip/ChampionPickWinTooltip";
import LolRatesUpdatedAt from "./LolRatesUpdatedAt/LolRatesUpdatedAt";

type Roles = "ALL" | "TOP" | "JUNGLE" | "MID" | "BOT" | "SUP";
const rolesArr: Roles[] = ["ALL", "TOP", "JUNGLE", "MID", "BOT", "SUP"];

type SortDescBy = "AvgPick" | "AvgWin" | "AvgAvg";

const LolRates = () => {
  const { rates: allChampionRates, updatedAt } = useChampionsQuery();

  const [checked51, setChecked51] = useState(false);

  // PE 2/3 - Should be on a separated component? Eg: <ChampionRateList rates={rates}/>
  const [selectedRole, setSelectedRole] = useState<Roles>("ALL");
  const [sortDescBy, setSortDescBy] = useState<SortDescBy>("AvgAvg");
  const [textFilter, setTextFilter] = useState("");

  const getFilteredRates = useCallback(() => {
    let filteredRates = [...allChampionRates];

    if (textFilter.trim().length > 0) {
      return  filteredRates.filter((r) =>
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
      <Box>
        <MyTextField
          id="text-filter"
          name="text-filter"
          value={textFilter}
          onChange={(e) => setTextFilter(e.target.value)}
          size="small"
          label="Filter champion"
          className="mt-3"
        />
      </Box>
      <Box>
        <label>
          <input
            type="checkbox"
            checked={checked51}
            onChange={(e) => setChecked51(e.target.checked)}
          />
          {"Only AvgWin >= 51%"}
        </label>
      </Box>

      <Box style={{ marginTop: 16, marginBottom: 16 }}>
        {rolesArr.map((role) => (
          <Button
            key={role}
            onClick={() => {
              setSelectedRole(role);
            }}
            style={{
              fontWeight: selectedRole === role ? "bold" : "normal",
              width: 100,
            }}
          >
            {role}
          </Button>
        ))}
      </Box>
      <TableContainer style={{ width: 515, maxHeight: 500 }}>
        <Table size="small" style={{ width: 500 }} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Champion</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    setSortDescBy("AvgPick");
                  }}
                  style={{
                    textTransform: "none",
                    fontWeight: sortDescBy === "AvgPick" ? "bold" : "normal",
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
                    fontWeight: sortDescBy === "AvgWin" ? "bold" : "normal",
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
                    fontWeight: sortDescBy === "AvgAvg" ? "bold" : "normal",
                  }}
                >
                  (Pick+Win)/2
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getFilteredRates().map((rate, i) => (
              <TableRow key={i}>
                <ChampionNameTableCell rate={rate} />

                <TableCell>
                  <ChampionTooltip championRate={rate} isHovering="Pick" />
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
      </TableContainer>
      {updatedAt && <LolRatesUpdatedAt updatedAt={updatedAt} />}
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  link: {
    color: "inherit",
    fontWeight: 600,
  },
}));

export default LolRates;
