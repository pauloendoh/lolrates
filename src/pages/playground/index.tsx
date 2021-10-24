import PlaygroundPage from "@/components/playground/PlaygroundPage/PlaygroundPage";
import MainLayout from "@/components/_common/_layout/MainLayout";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Head from "next/head";
import React from "react";

// https://stackoverflow.com/questions/56334381/why-my-font-awesome-icons-are-being-displayed-big-at-first-and-then-updated-to-t/59429852
config.autoAddCss = false;

export default function PlaygroundPageRoute() {
  return (
    <MainLayout>
      <Head>
        <title>Playground</title>
      </Head>
      <PlaygroundPage />
    </MainLayout>
  );
}
