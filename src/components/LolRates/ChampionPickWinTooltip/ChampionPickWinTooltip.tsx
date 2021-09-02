import { Box, Button, makeStyles, Tooltip } from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import { ILolRateChampion } from "../../../types/LolRate/ILolRateChampion";
import { getLolGraphsUrl } from "../../../utils/domain/rates/getLolGraphsUrl";
import { getOpggUrl } from "../../../utils/domain/rates/getOpggUrl";
import { getPatchHistoryUrl } from "../../../utils/domain/rates/getPatchHistoryUrl";
import { getUggUrl } from "../../../utils/domain/rates/getUggUrl";
import Flex from "../../Shared/Flexboxes/Flex";

const ChampionTooltip = ({
  championRate,
  isHovering,
}: {
  championRate: ILolRateChampion;
  isHovering: "Pick" | "Win";
}) => {
  const keys = {
    opgg: `opgg${isHovering}`, // opggPick or opggWin
    lolgraphs: `lolgraphs${isHovering}`,
    ugg: `ugg${isHovering}`,
    avg: `avg${isHovering}`,
  };

  const classes = useStyles();
  return (
    <Tooltip
      interactive
      title={
        <Flex flexDirection="column" py={1} className={classes.box}>
          <a target="_blank" href={getOpggUrl(championRate.championName)}>
            op.gg:{" "}
            {championRate[keys.opgg] > 0 &&
              championRate[keys.opgg].toFixed(1) + "%"}
          </a>
          <a target="_blank" href={getLolGraphsUrl(championRate.championName)}>
            lolgraphs:{" "}
            {championRate[keys.lolgraphs] > 0 &&
              championRate[keys.lolgraphs].toFixed(1) + "%"}
          </a>
          <a target="_blank" href={getUggUrl(championRate.championName)}>
            u.gg:{" "}
            {championRate[keys.ugg] > 0 &&
              championRate[keys.ugg].toFixed(1) + "%"}
          </a>
          <Box mt={2}>
            <a
              target="_blank"
              href={getPatchHistoryUrl(championRate.championName)}
            >
              Patch history
            </a>
          </Box>
        </Flex>
      }
    >
      <Button
        className={classNames({
          [`${classes.isPick}`]: isHovering === "Pick",
          [`${classes.isWin}`]: isHovering === "Win",
        })}
      >
        {championRate[keys.avg] > 0 && championRate[keys.avg].toFixed(1) + "%"}
      </Button>
    </Tooltip>
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
  isPick: {
    textDecoration: "underline",
    color: theme.palette.primary.main,
  },
  isWin: {
    textDecoration: "underline",
    color: theme.palette.secondary.main,
  },
}));

export default ChampionTooltip;
