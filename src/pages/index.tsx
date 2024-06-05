import LolRatesPageContent from "@/components/winrates/WinratesPage";
import { LolRateDto } from "@/types/domain/rates/LolRateDto";
import myServerAxios from "@/utils/axios/myServerAxios";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Box } from "@material-ui/core";
import { fetchLolRates } from "hooks/react-query/domain/rates/useLolRatesQuery";
import { GetStaticProps } from "next";
import Head from "next/head";
import MainLayout from "../components/_common/_layout/MainLayout";
import useLolRatesQuery from "../hooks/react-query/domain/rates/useLolRatesQuery";

// https://stackoverflow.com/questions/56334381/why-my-font-awesome-icons-are-being-displayed-big-at-first-and-then-updated-to-t/59429852
config.autoAddCss = false;

interface Props {
  initialData: LolRateDto;
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const initialData = await fetchLolRates(myServerAxios(ctx));
  return {
    props: {
      initialData,
    },
    revalidate: 3600, // 1 hour
  };
};

export default function WinratePageRoute(props: Props) {
  useLolRatesQuery(props.initialData);

  return (
    <MainLayout>
      <Head>
        <title>LoLRates</title>
      </Head>
      <Box mx="auto" maxWidth="650px">
        <LolRatesPageContent />
      </Box>
    </MainLayout>
  );
}
