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

type Roles = "ALL" | "TOP" | "JUNGLE" | "MID" | "BOT" | "SUP"
const rolesArr: Roles[] = ["ALL", "TOP", "JUNGLE", "MID", "BOT", "SUP"]

type SortByDesc = "AvgPick" | "AvgWin" | "AvgAvg"

const LolRates = ({ rates: lolRates }: Props) => {
  const [selectedRole, setSelectedRole] = useState<Roles>("TOP")
  const [filteredRates, setFilteredRates] = useState(lolRates)

  const [isOnly51, setIsOnly51] = useState(true)
  const [sortByDesc, setSortByDesc] = useState<SortByDesc>("AvgAvg")

  useEffect(() => {
    let rates = lolRates
    if (selectedRole !== "ALL") {
      rates = lolRates.filter((rate) => rate.role === selectedRole)
    }

    if (isOnly51) {
      rates = rates.filter((r) => r.avgWin >= 51)
    }

    if (sortByDesc === "AvgAvg") {
      rates = rates.sort((a, b) => {
        if (a.avgAvg < b.avgAvg) return 1
        if (a.avgAvg > b.avgAvg) return -1
        return 0
      })
    } else if (sortByDesc === "AvgPick") {
      rates = rates.sort((a, b) => {
        if (a.avgPick < b.avgPick) return 1
        if (a.avgPick > b.avgPick) return -1
        return 0
      })
    } else if (sortByDesc === "AvgWin") {
      rates = rates.sort((a, b) => {
        if (a.avgWin < b.avgWin) return 1
        if (a.avgWin > b.avgWin) return -1
        return 0
      })
    }

    setFilteredRates(rates)
  }, [selectedRole, isOnly51, sortByDesc])

  return (
    <Box p={3}>
      <Typography variant="h3">LoL Rates</Typography>
      <Box>
        <ul>
          <li>AvgPick = Average pick rate between OP.GG and LoLGraphs</li>
          <li>AvgAvg = Mean value between AvgPick and AvgWin</li>
        </ul>
        <label>
          <input
            type="checkbox"
            checked={isOnly51}
            onChange={(e) => setIsOnly51(e.target.checked)}
          />
          {"Only AvgWin >= 51%"}
        </label>
      </Box>
      <Box flex my={2}>
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
                    setSortByDesc("AvgPick")
                  }}
                  style={{
                    textTransform: "none",
                    fontWeight: sortByDesc === "AvgPick" ? "bold" : "normal",
                  }}
                >
                  AvgPick
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    setSortByDesc("AvgWin")
                  }}
                  style={{
                    textTransform: "none",
                    fontWeight: sortByDesc === "AvgWin" ? "bold" : "normal",
                  }}
                >
                  AvgWin
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    setSortByDesc("AvgAvg")
                  }}
                  style={{
                    textTransform: "none",
                    fontWeight: sortByDesc === "AvgAvg" ? "bold" : "normal",
                  }}
                >
                  AvgAvg
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
                          opgg:{" "}
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
                          opgg:{" "}
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
    </Box>
  )
}

interface Props {
  rates: LolRateDto[]
}

export default LolRates
