import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import Layout from "../src/components/Layout/Layout";
import LolRates from "../src/components/LolRates/LolRates";
import useChampionsQuery, { fetchChampions } from "../src/hooks/react-query/auth/useChampionsQuery";
import useMeQuery, { fetchMe } from "../src/hooks/react-query/auth/useMeQuery";
import myServerAxios from "../src/utils/axios/myServerAxios";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const [result, initialUser] = await Promise.all([
    fetchChampions(myServerAxios(ctx)),
    fetchMe(myServerAxios(ctx)).catch((err) => console.log(err)),
  ]);

  return {
    props: {
      initialChampionRates: result.rates,
      initialUpdatedAt: result.updatedAt,
      initialUser: initialUser ? initialUser : null,
    },
  };
};

const IndexPage = ({
  initialChampionRates,
  initialUpdatedAt,
  initialUser,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const user = useMeQuery(initialUser);
  const {rates: championRates,updatedAt } = useChampionsQuery({rates: initialChampionRates, updatedAt: initialUpdatedAt})

  return (
    <Layout>
      <LolRates rates={championRates} updatedAt={updatedAt} />
    </Layout>
  );
};

export default IndexPage;
