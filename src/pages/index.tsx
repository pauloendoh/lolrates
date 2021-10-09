import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Box } from "@material-ui/core";
import Head from "next/head";
import React from "react";
import LolRatesPageContent from "../components/WinRatesPage";
import MainLayout from "../components/_common/_layout/MainLayout";
import useLolRatesQuery from "../hooks/react-query/domain/rates/useLolRatesQuery";

// https://stackoverflow.com/questions/56334381/why-my-font-awesome-icons-are-being-displayed-big-at-first-and-then-updated-to-t/59429852
config.autoAddCss = false;

const IndexPage = () => {
  const { rates: allChampionRates, updatedAt, isLoading } = useLolRatesQuery();

  return (
    <MainLayout>
      <Head>
        <title>LoL Rates</title>
      </Head>
      <Box mx="auto" maxWidth="650px">
        <LolRatesPageContent />
      </Box>
    </MainLayout>
  );
};

export default IndexPage;
