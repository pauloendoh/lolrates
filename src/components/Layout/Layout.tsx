import { Box } from "@material-ui/core";

import Head from "next/head";
import React, { ReactNode } from "react";
import DefaultNavbar from "./Navbar/DefaultNavbar";
import Navbar from "./Navbar/Navbar";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "LoL Rates" }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Box height="100%">
      {/* <DefaultNavbar /> */}
      <Navbar />
      <Box pt={10}>{children}</Box>
    </Box>
  </>
);

export default Layout;
