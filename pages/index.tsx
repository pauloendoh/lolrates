import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import Layout from "../src/components/Layout/Layout";
import LolRates from "../src/components/LolRates/LolRates";
import { apiRoutes } from "../src/consts/apiRoutes";
import useMeQuery, { fetchMe } from "../src/hooks/react-query/auth/useMeQuery";
import { ILolRateChampion } from "../src/types/LolRate/ILolRateChampion";
import { ILolRateUpdatedAt } from "../src/types/LolRate/ILolRateUpdatedAt";
import myClientAxios from "../src/utils/axios/myClientAxios";
import myServerAxios from "../src/utils/axios/myServerAxios";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await myClientAxios.get(apiRoutes.lolRates);
  const result = res.data;
  const rates = result.rates as ILolRateChampion[];

  const updatedAt = result.updatedAt as ILolRateUpdatedAt;

  const initialUser = await fetchMe(myServerAxios(ctx)).catch((err) =>
    console.log(err)
  );

  return {
    props: {
      rates,
      updatedAt,
      initialUser: initialUser ? initialUser : null,
    },
  };
};

const IndexPage = ({
  rates,
  updatedAt,
  initialUser,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const user = useMeQuery(initialUser);

  return (
    <Layout>
      <LolRates rates={rates} updatedAt={updatedAt} />
    </Layout>
  );
};

export default IndexPage;
