import React from "react";
import ReactTimeago from "react-timeago";
import { LolRateUpdatedAt } from "../../../../types/domain/rates/LolRateUpdatedAt";
import Txt from "../../../_common/text/Txt";
import S from "./styles";

const RatesUpdatedAt = ({ updatedAt }: { updatedAt: LolRateUpdatedAt }) => {
  return (
    <S.Root>
      <Txt>
        OP.GG updated{" "}
        <ReactTimeago date={updatedAt.opggUpdatedAt} live={false} />
      </Txt>
      <Txt>
        LeagueOfGraphs updated{" "}
        <ReactTimeago date={updatedAt.lolgraphsUpdatedAt} live={false} />
      </Txt>
      <Txt>
        U.GG updated <ReactTimeago date={updatedAt.uggUpdatedAt} live={false} />
      </Txt>
    </S.Root>
  );
};

export default RatesUpdatedAt;
