import DraftPage from "@/components/draft/DraftPage/DraftPage";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import React from "react";
import MainLayout from "../../components/_common/_layout/MainLayout";

// PE 2/3 - could be used as DRY ?
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  const userStr = cookies.user;

  if (!userStr) {
    // 2/3
    // redirect to winrates page
    return {
      redirect: {
        destination: "/",
        statusCode: 302,
      },
    };
  }

  return {
    props: {},
  };
};

const DraftPageRoute = () => {
  return (
    <MainLayout>
      <Head>
        <title>Draft</title>
      </Head>

      <DraftPage />
    </MainLayout>
  );
};

export default DraftPageRoute;
