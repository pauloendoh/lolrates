import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { LolRateDto } from "../../interfaces/LolRateDto"

type Roles = "ALL" | "TOP" | "JUNGLE" | "MID" | "BOT" | "SUP"
const rolesArr: Roles[] = ["ALL", "TOP", "JUNGLE", "MID", "BOT", "SUP"]

const LolRates = ({ rates: lolRates }: Props) => {
  const [selectedRole, setSelectedRole] = useState<Roles>("TOP")
  const [filteredRates, setFilteredRates] = useState(lolRates)

  const [isOnly51, setIsOnly51] = useState(true)

  useEffect(() => {
    let rates = lolRates
    if (selectedRole !== "ALL") {
      rates = lolRates.filter((rate) => rate.role === selectedRole)
    }

    if (isOnly51) {
      rates = rates.filter((r) => r.avgWin >= 51)
    }
    setFilteredRates(rates)
  }, [selectedRole, isOnly51])

  return (
    <Box p={3}>
      <Typography variant="h3">LoL Rates</Typography>
      <Box>
        <ul>
          <li>AvgPick = Average pick rate between OP.GG and LoLGraphs</li>
          <li>AvgWin = Average win rate ... </li>
          <li>AvgAvg = Mean value between AvgPick and AvgWin</li>
          <li>Sorting by AvgAvg descending</li>
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
              <TableCell>AvgPick</TableCell>
              <TableCell>AvgWin</TableCell>
              <TableCell>AvgAvg</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRates.map((rate, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Box>
                    <Box>{rate.championName}</Box>
                    <Box>
                      <img
                        src={rate.iconUrl}
                        style={{ width: 30, borderRadius: 100 }}
                      />
                    </Box>
                  </Box>
                </TableCell>

                <TableCell>
                  {rate.avgPick > 0 ? rate.avgPick.toFixed(1) + "%" : ""}
                </TableCell>

                <TableCell>
                  {rate.avgWin > 0 ? rate.avgWin.toFixed(1) + "%" : ""}
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
