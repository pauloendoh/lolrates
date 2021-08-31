import { Box, Paper } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { roles } from "../../../../types/LolRate/ChampionRoleType";
import { ILolRateChampion } from "../../../../types/LolRate/ILolRateChampion";
import DraftSelectorRow from "./DraftSelectorRow/DraftSelectorRow";

type FilterByType = "All" | "Over 51% WR";

// PE 2/3
const DraftSelector = (props: { rates: ILolRateChampion[] }) => {
  const [sortBy, setSortBy] = useState<FilterByType>("Over 51% WR");

  const isLast = useCallback(
    (index: number) => {
      return roles.length === index - 1;
    },
    [props.rates]
  );

  const getRatesByRole = useCallback(
    (role) => {
      return props.rates.filter((r) => r.role === role);
    },
    [props.rates]
  );


  return (
    <Paper>
      <Box px={2} py={1}>
        {/* iterating roles */}
        {roles.map((role, index) => (
          <DraftSelectorRow
            key={role}
            hasBorderBottom={!isLast(index)}
            roleRates={getRatesByRole(role)}
            role={role}
            sortBy={sortBy}
            setSortBy={(changed) => setSortBy(changed)}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default DraftSelector;
