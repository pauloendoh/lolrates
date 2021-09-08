import { makeStyles } from "@material-ui/core";
import { Box } from "@material-ui/core";
import React from "react";
import { urls } from "../../../consts/urls";
import { ILolRateChampion } from "../../../types/LolRate/ILolRateChampion";
import { getLolGraphsUrl } from "../../../utils/domain/rates/getLolGraphsUrl";
import { getOpggUrl } from "../../../utils/domain/rates/getOpggUrl";
import { getPatchHistoryUrl } from "../../../utils/domain/rates/getPatchHistoryUrl";
import Flex from "../../Shared/Flexboxes/Flex";

const ChampionTooltipTitle = ({
  championName,
}: {
  championName: string
}) => {
  const classes = useStyles();

  return (
    <Flex flexDirection="column" py={1} className={classes.box}>
      <a target="_blank" href={getOpggUrl(championName)}>
        op.gg
      </a>
      <a target="_blank" href={getLolGraphsUrl(championName)}>
        lolgraphs
      </a>
      <a target="_blank" href={urls.uggChampion(championName)}>
        u.gg
      </a>
      <Box mt={2}>
        <a target="_blank" href={getPatchHistoryUrl(championName)}>
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

export default ChampionTooltipTitle;
