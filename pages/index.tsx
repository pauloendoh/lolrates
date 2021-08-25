import { Box, Container } from "@material-ui/core";
import React from "react";

import Layout from "../src/components/Layout/Layout";
import LolRates from "../src/components/LolRates/LolRates";
import useLolRates from "../src/hooks/react-query/auth/useLolRatesQuery";

const IndexPage = () => {
  const { rates: championRates, updatedAt } = useLolRates();

  return (
    <Layout>
      
        <Box mx="auto" maxWidth="650px">
          <LolRates />
        </Box>
      
    </Layout>
  );
};

export default IndexPage;
