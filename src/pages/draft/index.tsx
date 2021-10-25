import DraftPage from "@/components/draft/DraftPage/DraftPage";
import { getAuthServerSideProps } from "@/utils/getServerSideProps/getAuthServerSideProps";
import Head from "next/head";
import React from "react";
import MainLayout from "../../components/_common/_layout/MainLayout";

export const getServerSideProps = getAuthServerSideProps;

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
