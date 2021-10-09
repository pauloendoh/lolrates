import { Box, Container, makeStyles } from "@material-ui/core";
import classNames from "classnames";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import React from "react";
import styled from "styled-components";
import DraftSelector from "../../components/domain/draft/DraftSelector/DraftSelector";
import DraftSidebarContent from "../../components/domain/draft/DraftSidebarContent/DraftSidebarContent";
import TotalChampionRadar from "../../components/domain/draft/TotalChampionRadar/TotalChampionRadar";
import Layout from "../../components/Layout/Layout";
import Flex from "../../components/UI/Flexboxes/Flex";
import MySidebar from "../../components/UI/MySidebar";
import useLolRatesQuery from "../../hooks/react-query/domain/rates/useLolRatesQuery";
import useSidebarStore from "../../hooks/zustand-stores/useSidebarStore";

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

const DraftPage = () => {
  const classes = useStyles();

  const { sidebarIsOpen } = useSidebarStore();

  const { rates } = useLolRatesQuery();

  return (
    <Layout>
      <Head>
        <title>Draft</title>
      </Head>

      <S.DraftPageContent>
        <MySidebar>
          <DraftSidebarContent />
        </MySidebar>

        <Box
          className={classNames(classes.content, {
            [classes.contentShift]: sidebarIsOpen,
          })}
          flexGrow={1}
        >
          <Box pt={5} pb={10}>
            <Container style={{ minWidth: 900 }}>
              <Flex>
                <Box>
                  {rates && rates.length > 0 && <DraftSelector rates={rates} />}
                </Box>
                <TotalChampionRadar />
              </Flex>
            </Container>
          </Box>
        </Box>
      </S.DraftPageContent>
    </Layout>
  );
};

const S = {
  DraftPageContent: styled(Flex)({
    height: "100%",
  }),
};

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,

    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 300,
  },
}));

export default DraftPage;
