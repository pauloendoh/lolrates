import { Box } from "@material-ui/core";
import Head from "next/head";
import React from "react";
import Layout from "../src/components/Layout/Layout";
import LolRates from "../src/components/LolRates/LolRates";
import useLolRatesQuery from "../src/hooks/react-query/auth/useLolRatesQuery";

const IndexPage = () => {
  const { rates: allChampionRates, updatedAt, isLoading } = useLolRatesQuery();

  return (
    <Layout>
      <Head>
        <title>LoL Rates</title>
      </Head>
      <Box mx="auto" maxWidth="650px">
        <LolRates />
      </Box>
    </Layout>
  );
};

export default IndexPage;
