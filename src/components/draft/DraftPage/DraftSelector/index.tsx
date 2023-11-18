import { spacing } from "@/utils/theme";
import { Paper } from "@material-ui/core";
import { useCallback, useState } from "react";
import { roles } from "../../../../types/domain/rates/ChampionRoleType";
import { LolRateChampionDto } from "../../../../types/domain/rates/LolRateChampionDto";
import DraftRow from "./DraftRow/DraftRow";

type FilterByType = "All" | "Over 50.5% WR";

// PE 2/3
const DraftSelector = (props: { rates: LolRateChampionDto[] }) => {
  const [sortBy, setSortBy] = useState<FilterByType>("Over 50.5% WR");

  const isLast = useCallback(
    (index: number) => {
      return roles.length - 1 === index;
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
    <Paper style={{ padding: `${spacing(1)}px ${spacing(2)}px` }}>
      {/* iterating roles */}
      {roles.map((role, index) => (
        <DraftRow
          key={role}
          hasBorderBottom={!isLast(index)}
          roleRates={getRatesByRole(role)}
          role={role}
          sortBy={sortBy}
          setSortBy={(changed) => setSortBy(changed)}
        />
      ))}
    </Paper>
  );
};

export default DraftSelector;
