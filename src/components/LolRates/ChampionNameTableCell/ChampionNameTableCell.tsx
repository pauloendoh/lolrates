import { Box, makeStyles, TableCell, Tooltip } from "@material-ui/core";
import React from "react";
import { ILolRateChampion } from "../../../types/LolRate/ILolRateChampion";
import { getLolGraphsUrl } from "../../../utils/domain/rates/getLolGraphsUrl";
import { getOpggUrl } from "../../../utils/domain/rates/getOpggUrl";
import { getPatchHistoryUrl } from "../../../utils/domain/rates/getPatchHistoryUrl";
import { getUggUrl } from "../../../utils/domain/rates/getUggUrl";
import Flex from "../../Shared/Flexboxes/Flex";

const ChampionNameTableCell = ({ rate }: { rate: ILolRateChampion }) => {
  return (
    <TableCell>
      <Tooltip interactive title={<TooltipTitle rate={rate} />}>
        <Box style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
          <Box>
            <img src={rate.iconUrl} style={{ width: 30, borderRadius: 100 }} />
          </Box>

          <Box style={{ marginLeft: 8 }}>
            <Box>{rate.championName}</Box>
            <Box style={{ fontSize: "smaller" }}>
              <i>{rate.role}</i>
            </Box>
          </Box>
        </Box>
      </Tooltip>
    </TableCell>
  );
};

const TooltipTitle = ({ rate: championRate }: { rate: ILolRateChampion }) => {
  const classes = useStyles();

  return (
    <Flex flexDirection="column" py={1} className={classes.box}>
      <a target="_blank" href={getOpggUrl(championRate.championName)}>
        op.gg
      </a>
      <a target="_blank" href={getLolGraphsUrl(championRate.championName)}>
        lolgraphs
      </a>
      <a target="_blank" href={getUggUrl(championRate.championName)}>
        u.gg
      </a>
      <Box mt={2}>
        <a target="_blank" href={getPatchHistoryUrl(championRate.championName)}>
          Patch history
        </a>
      </Box>
    </Flex>
  );
};

const useStyles = makeStyles((theme) => ({
  box: {
    "& a": {
      fontSize: 12,
      marginTop: 4,
      color: "white",
    },

    "& a:not(:last-child)": {
      marginBottom: theme.spacing(1),
    },
  },
}));

export default ChampionNameTableCell;
