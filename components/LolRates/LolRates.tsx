import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { LolRateDto } from "../../interfaces/LolRateDto"

type Roles = "ALL" | "TOP" | "JUNGLE" | "MID" | "BOT" | "SUP"
const rolesArr: Roles[] = ["ALL", "TOP", "JUNGLE", "MID", "BOT", "SUP"]

const LolRates = ({ rates: lolRates }: Props) => {
  const [selectedRole, setSelectedRole] = useState<Roles>("TOP")
  const [filteredRates, setFilteredRates] = useState(lolRates)

  useEffect(() => {
    if (selectedRole === "ALL") {
      setFilteredRates(lolRates)
    } else {
      setFilteredRates(lolRates.filter((rate) => rate.role === selectedRole))
    }
  }, [selectedRole])

  return (
    <Box>
      <Box flex>
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
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Champion</TableCell>
            <TableCell>AvgWin</TableCell>
            <TableCell>AvgPick</TableCell>
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
    </Box>
  )
}

interface Props {
  rates: LolRateDto[]
}

export default LolRates
