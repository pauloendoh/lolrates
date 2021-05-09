import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { LolRateDto } from "../../interfaces/LolRateDto"
import { LolRateUpdatedAtDto } from "../../interfaces/LolRateUpdatedAtDto"
import HelpIcon from "@material-ui/icons/Help"

type Roles = "ALL" | "TOP" | "JUNGLE" | "MID" | "BOT" | "SUP"
const rolesArr: Roles[] = ["ALL", "TOP", "JUNGLE", "MID", "BOT", "SUP"]

type SortDescBy = "AvgPick" | "AvgWin" | "AvgAvg"

const LolRates = ({ rates: allChampionRates, updatedAt }: Props) => {
  const [checked51, setChecked51] = useState(false)

  // PE 2/3 - Should be on a separated component? Eg: <ChampionRateList rates={rates}/>
  const [selectedRole, setSelectedRole] = useState<Roles>("ALL")
  const [sortDescBy, setSortDescBy] = useState<SortDescBy>("AvgAvg")
  const [filteredRates, setFilteredRates] = useState(allChampionRates)

  useEffect(() => {
    let filteredRates = [...allChampionRates]

    // PE 1/3 - Separate into filterRates(rates, selectedRole, checked51, sortDescBy)
    if (selectedRole !== "ALL") {
      filteredRates = allChampionRates.filter(
        (rate) => rate.role === selectedRole
      )
    }

    if (checked51) {
      filteredRates = filteredRates.filter((r) => r.avgWin >= 51)
    }

    switch (sortDescBy) {
      case "AvgAvg":
        filteredRates = filteredRates.sort((a, b) => b.avgAvg - a.avgAvg)
        break
      case "AvgPick":
        filteredRates = filteredRates.sort((a, b) => b.avgPick - a.avgPick)
        break
      case "AvgWin":
        filteredRates = filteredRates.sort((a, b) => b.avgWin - a.avgWin)
    }

    setFilteredRates(filteredRates)
  }, [selectedRole, checked51, sortDescBy])

  return (
    <Box p={3}>
      <Typography variant="h3">LoL Rates</Typography>
      <Box>
        <ul>
          <li>
            Average pick and win rates from OP.GG, LeagueOfGraphs and U.GG
          </li>
          <li>Global Platinum+</li>
        </ul>
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
              setSelectedRole(role)
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
                    setSortDescBy("AvgPick")
                  }}
                  style={{
                    textTransform: "none",
                    fontWeight: sortDescBy === "AvgPick" ? "bold" : "normal",
                  }}
                >
                  AvgPick
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    setSortDescBy("AvgWin")
                  }}
                  style={{
                    textTransform: "none",
                    fontWeight: sortDescBy === "AvgWin" ? "bold" : "normal",
                  }}
                >
                  AvgWin
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    setSortDescBy("AvgAvg")
                  }}
                  style={{
                    textTransform: "none",
                    fontWeight: sortDescBy === "AvgAvg" ? "bold" : "normal",
                  }}
                >
                  AvgAvg
                  <Tooltip title="(AvgPick + AvgWin) / 2">
                    <HelpIcon style={{ marginLeft: 4, height: "0.75em" }} />
                  </Tooltip>
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRates.map((rate, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    <Box>
                      <img
                        src={rate.iconUrl}
                        style={{ width: 30, borderRadius: 100 }}
                      />
                    </Box>

                    <Box style={{ marginLeft: 8 }}>
                      <Box>{rate.championName}</Box>
                      <Box style={{ fontSize: "smaller" }}>
                        <i>{rate.role}</i>
                      </Box>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell>
                  <Tooltip
                    title={
                      <>
                        <a
                          target="_blank"
                          href={`https://www.op.gg/champion/${rate.championName}/statistics`}
                        >
                          op.gg:{" "}
                          {rate.opggPick > 0
                            ? rate.opggPick.toFixed(1) + "%"
                            : ""}{" "}
                        </a>
                        <br />
                        <a
                          target="_blank"
                          href={`https://www.google.com/search?q=${rate.championName} lolgraphs`}
                        >
                          lolgraphs:{" "}
                          {rate.lolgraphsPick > 0
                            ? rate.lolgraphsPick.toFixed(1) + "%"
                            : ""}{" "}
                        </a>
                        <br />
                        <a
                          target="_blank"
                          href={`https://u.gg/lol/champions/${rate.championName}`}
                        >
                          u.gg:{" "}
                          {rate.uggPick > 0
                            ? rate.uggPick.toFixed(1) + "%"
                            : ""}{" "}
                        </a>
                      </>
                    }
                    interactive
                  >
                    <Button>
                      {rate.avgPick > 0 ? rate.avgPick.toFixed(1) + "%" : ""}{" "}
                    </Button>
                  </Tooltip>
                </TableCell>

                <TableCell>
                  <Tooltip
                    title={
                      <>
                        <a
                          target="_blank"
                          href={`https://www.op.gg/champion/${rate.championName}/statistics`}
                        >
                          op.gg:{" "}
                          {rate.opggWin > 0
                            ? rate.opggWin.toFixed(1) + "%"
                            : ""}{" "}
                        </a>
                        <br />
                        <a
                          target="_blank"
                          href={`https://www.google.com/search?q=${rate.championName} lolgraphs`}
                        >
                          lolgraphs:{" "}
                          {rate.lolgraphsWin > 0
                            ? rate.lolgraphsWin.toFixed(1) + "%"
                            : ""}{" "}
                        </a>
                        <br />
                        <a
                          target="_blank"
                          href={`https://u.gg/lol/champions/${rate.championName}`}
                        >
                          u.gg:{" "}
                          {rate.uggWin > 0 ? rate.uggWin.toFixed(1) + "%" : ""}{" "}
                        </a>
                      </>
                    }
                    interactive
                  >
                    <Button>
                      {rate.avgWin > 0 ? rate.avgWin.toFixed(1) + "%" : ""}{" "}
                    </Button>
                  </Tooltip>
                </TableCell>

                <TableCell>
                  {rate.avgAvg > 0 ? rate.avgAvg.toFixed(1) + "%" : ""}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>
        OP.GG updated at: {new Date(updatedAt.opggUpdatedAt).toLocaleString()}
      </Box>
      <Box>
        LeagueOfGraphs updated at:{" "}
        {new Date(updatedAt.lolgraphsUpdatedAt).toLocaleString()}
      </Box>
      <Box>
        U.GG updated at: {new Date(updatedAt.uggUpdatedAt).toLocaleString()}
      </Box>
    </Box>
  )
}

interface Props {
  rates: LolRateDto[]
  updatedAt: LolRateUpdatedAtDto
}

export default LolRates
