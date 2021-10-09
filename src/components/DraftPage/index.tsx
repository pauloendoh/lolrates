import SidebarWrapper from "@/components/_common/_layout/SidebarWrapper/SidebarWrapper";
import { Box, Container, makeStyles } from "@material-ui/core";
import classNames from "classnames";
import Head from "next/head";
import React from "react";
import useLolRatesQuery from "../../hooks/react-query/domain/rates/useLolRatesQuery";
import useSidebarStore from "../../hooks/zustand-stores/useSidebarStore";
import Flex from "../_common/flexboxes/Flex";
import MainLayout from "../_common/_layout/MainLayout";
import AsideChampionRadar from "./AsideChampionRadar";
import DraftSelector from "./DraftSelector";
import DraftSidebarContent from "./DraftSidebar";
import S from "./styles";

const DraftPage = () => {
  const classes = useStyles();

  const { sidebarIsOpen } = useSidebarStore();

  const { rates } = useLolRatesQuery();

  return (
    <MainLayout>
      <Head>
        <title>Draft</title>
      </Head>

      <S.DraftPageContent>
        <SidebarWrapper>
          <DraftSidebarContent />
        </SidebarWrapper>

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
                <AsideChampionRadar />
              </Flex>
            </Container>
          </Box>
        </Box>
      </S.DraftPageContent>
    </MainLayout>
  );
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
