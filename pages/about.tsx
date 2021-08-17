import { Box } from "@material-ui/core";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import Layout from "../src/components/Layout/Layout";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      abc: 'sdafds'
    },
  };
};

const AboutPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  
  return <Layout><Box>{props.abc} Why this doesn't break?</Box></Layout>;
};

export default AboutPage;
