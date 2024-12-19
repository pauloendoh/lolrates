import SnackbarWrapper from "@/components/_common/_layout/Snackbar/SnackbarWrapper";
import { Box } from "@material-ui/core";
import Head from "next/head";
import { ReactNode } from "react";
import Navbar from "./Navbar/Navbar";

type Props = {
  children?: ReactNode; // could inherit React.FC instead of passing children props
  title?: string;
};

const MainLayout = ({ children, title = "LoLRates" }: Props) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Box height="100%">
      {/* <DefaultNavbar /> */}
      <Navbar />
      <Box pt={10}>{children}</Box>

      {/* <PlaytimePopup /> */}
    </Box>
    <SnackbarWrapper />
  </>
);

export default MainLayout;
