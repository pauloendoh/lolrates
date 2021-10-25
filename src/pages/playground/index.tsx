import PlaygroundPage from "@/components/playground/PlaygroundPage/PlaygroundPage";
import MainLayout from "@/components/_common/_layout/MainLayout";
import Page from "@/components/_common/_layout/Navbar/Page/Page";
import { getAuthServerSideProps } from "@/utils/getServerSideProps/getAuthServerSideProps";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Head from "next/head";
import React from "react";

export const getServerSideProps = getAuthServerSideProps;

export default function PlaygroundPageRoute() {
  return (
    <MainLayout>
      <Head>
        <title>Playground</title>
      </Head>

      <Page type="auth">
        <PlaygroundPage />
      </Page>
    </MainLayout>
  );
}
