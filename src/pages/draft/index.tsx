import DraftPage from "@/components/DraftPage/DraftPage";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import React from "react";
import MainLayout from "../../components/_common/_layout/MainLayout";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx); // Add logic to extract token from `req.headers.cookie`
  const userStr = cookies.user;
  // const authUser = JSON.parse(userStr) as AuthUserGetDto

  if (!userStr) {
    // Redirect to index page
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

const DraftPageWrapper = () => {
  return (
    <MainLayout>
      <Head>
        <title>Draft</title>
      </Head>

      <DraftPage />
    </MainLayout>
  );
};

export default DraftPageWrapper;
