import { ImSortAmountDesc } from "react-icons/im";

import Flex from "@/components/_common/flexboxes/Flex";
import FlexCol from "@/components/_common/flexboxes/FlexCol";
import Txt from "@/components/_common/text/Txt";
import { localStorageKeys } from "@/utils/consts/localStorageKeys";
import {
  Box,
  Button,
  Checkbox,
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
import { Skeleton } from "@material-ui/lab";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MdSearch } from "react-icons/md";
import useLolRatesQuery from "../../../hooks/react-query/domain/rates/useLolRatesQuery";
import { LolRateChampionDto } from "../../../types/domain/rates/LolRateChampionDto";
import stringAreVerySimilar from "../../../utils/text/stringsAreVerySimilar";
import { urls } from "../../../utils/urls/urls";
import FlexVCenter from "../../_common/flexboxes/FlexVCenter";
import MyTextField from "../../_common/inputs/MyTextField";
import ChampionInfo1stTD from "./ChampionInfo1stTD";
import ChampionTooltip from "./ChampionWRTooltip";
import RatesUpdatedAt from "./RatesUpdatedAt";
import S from "./styles";

type Roles = "ALL" | "TOP" | "JUNGLE" | "MID" | "BOT" | "SUP";
const rolesArr: Roles[] = ["ALL", "TOP", "JUNGLE", "MID", "BOT", "SUP"];

type SortDescBy = "AvgPick" | "AvgWin" | "AvgAvg";

// PE 1/3 - Change to LolRatesPage
const LolRatesPageContent = () => {
  const router = useRouter();
  const routerQuery = router.query as { q?: string };
  const { rates: allChampionRates, updatedAt, isLoading } = useLolRatesQuery();

  const [onlyHighWinRate, setOnlyHighWinRate] = useState(true);

  useEffect(() => {
    // useLocalStorage was not working. Always setting default value on first render
    const value = localStorage.getItem(localStorageKeys.onlyHighWinRate);
    if (value) {
      setOnlyHighWinRate(JSON.parse(value));
    }
  }, []);

  // PE 2/3 - Should be on a separated component? Eg: <ChampionRateList rates={rates}/>
  const [selectedRole, setSelectedRole] = useState<Roles>("ALL");
  const [sortDescBy, setSortDescBy] = useState<SortDescBy>("AvgAvg");
  const [textFilter, setTextFilter] = useState("");

  useEffect(() => {
    if (router.isReady && routerQuery.q) setTextFilter(routerQuery.q);
  }, [router.isReady]);

  const filteredRates = useMemo(() => {
    let filteredRates = [...allChampionRates];

    if (routerQuery?.q?.trim().length > 0) {
      return filteredRates.filter((r) =>
        stringAreVerySimilar(routerQuery?.q, r.championName)
      );
    }

    // PE 1/3 - Separate into filterRates(rates, selectedRole, checked51, sortDescBy)
    if (selectedRole !== "ALL") {
      filteredRates = allChampionRates.filter(
        (rate) => rate.role === selectedRole
      );
    }

    if (onlyHighWinRate) {
      filteredRates = filteredRates.filter((r) => r.avgWin >= 50.5);
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
  }, [
    allChampionRates,
    selectedRole,
    onlyHighWinRate,
    sortDescBy,
    routerQuery.q,
  ]);

  const shouldShowRate = (rate: LolRateChampionDto) => {
    if (routerQuery?.q?.trim().length > 0) {
      return stringAreVerySimilar(routerQuery?.q, rate.championName);
    }
    if (selectedRole === "ALL") return true;
    if (selectedRole === rate.role) return true;
    return false;
  };

  const classes = useStyles();

  const [throttle, setThrottle] = useState<NodeJS.Timeout>();

  const handleChangeTextFilter = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setTextFilter(e.target.value);
      clearTimeout(throttle);
      setThrottle(
        setTimeout(() => {
          router.push(urls.pages.indexSearch(e.target.value));
        }, 500)
      );
    },
    []
  );

  return (
    <Box p={3}>
      <Typography variant="h3">LoLRates</Typography>
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
          onChange={handleChangeTextFilter}
          size="small"
          label={
            <S.SearchLabel>
              <MdSearch />
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
              checked={onlyHighWinRate}
              onChange={(e) => {
                const checked = e.target.checked;
                setOnlyHighWinRate(checked);
                localStorage.setItem(
                  localStorageKeys.onlyHighWinRate,
                  JSON.stringify(checked)
                );
              }}
              name="avgWin51"
              color="primary"
            />
          }
          label="Only Win >= 50.5%"
        />
      </Box>

      {isLoading ? (
        <FlexCol style={{ gap: 16 }}>
          {/* <CircularProgress /> */}

          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Flex style={{ justifyContent: "space-evenly" }}>
            <Skeleton variant="circle" width={30} height={30} />
            <Skeleton variant="circle" width={30} height={30} />
            <Skeleton variant="circle" width={30} height={30} />
          </Flex>

          <Skeleton variant="rect" />
        </FlexCol>
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
                          setSortDescBy("AvgWin");
                        }}
                        style={{
                          textTransform: "none",
                          fontWeight:
                            sortDescBy === "AvgWin" ? "bold" : "normal",
                        }}
                      >
                        Win %
                        {sortDescBy === "AvgWin" && (
                          <ImSortAmountDesc
                            style={{
                              marginLeft: 4,
                            }}
                          />
                        )}
                      </Button>
                    </TableCell>

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
                        Pick %
                        {sortDescBy === "AvgPick" && (
                          <ImSortAmountDesc
                            style={{
                              marginLeft: 4,
                            }}
                          />
                        )}
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
                        (Win+Pick)/2
                        {sortDescBy === "AvgAvg" && (
                          <ImSortAmountDesc
                            style={{
                              marginLeft: 4,
                            }}
                          />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRates.map((rate, i) => (
                    <TableRow
                      key={`${rate.championName}-${rate.role}`}
                      style={{
                        display: shouldShowRate(rate) ? "table-row" : "none",
                      }}
                    >
                      <ChampionInfo1stTD rate={rate} />

                      <TableCell>
                        <ChampionTooltip championRate={rate} isHovering="Win" />
                      </TableCell>

                      <TableCell>
                        <ChampionTooltip
                          championRate={rate}
                          isHovering="Pick"
                        />
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
