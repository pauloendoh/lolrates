import { GetStaticProps } from "next";
import React from "react";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import Layout from "../src/components/Layout/Layout";
import LolRates from "../src/components/LolRates/LolRates";
import { apiRoutes } from "../src/consts/apiRoutes";
import useChampionsQuery, {
  fetchChampions
} from "../src/hooks/react-query/auth/useChampionsQuery";
import { fetchMe } from "../src/hooks/react-query/auth/useMeQuery";
import myServerAxios from "../src/utils/axios/myServerAxios";

export const getStaticProps: GetStaticProps = async (ctx) => {

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(apiRoutes.auth.me, () =>
    fetchMe(myServerAxios(ctx))
  );

  await queryClient.prefetchQuery(apiRoutes.lolRates, () =>
    fetchChampions(myServerAxios(ctx))
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 30 // 30 min?
  };
};

const IndexPage = () => {
  const { rates: championRates, updatedAt } = useChampionsQuery();

  return (
    <Layout>
      <LolRates rates={championRates} updatedAt={updatedAt} />
    </Layout>
  );
};

export default IndexPage;
