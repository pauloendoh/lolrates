import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import ReactTimeago from "react-timeago";
import { ILolRateUpdatedAt } from "../../../types/LolRate/ILolRateUpdatedAt";
import Txt from "../../Shared/Text/Txt";

const LolRatesUpdatedAt = ({ updatedAt }: { updatedAt: ILolRateUpdatedAt }) => {
  const classes = useStyles();

  return (
    <Box mt={2}>
      <Box>
        <Txt>
          OP.GG updated&nbsp;
          <ReactTimeago date={updatedAt.opggUpdatedAt} live={false} />
        </Txt>
      </Box>
      <Box>
        <Txt>
          LeagueOfGraphs updated &nbsp;
          <ReactTimeago date={updatedAt.lolgraphsUpdatedAt} live={false} />
        </Txt>
      </Box>
      <Box>
        <Txt>
          U.GG updated&nbsp;
          <ReactTimeago date={updatedAt.uggUpdatedAt} live={false} />
        </Txt>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  link: {
    color: "inherit",
    fontWeight: 600,
  },
}));

export default LolRatesUpdatedAt;
