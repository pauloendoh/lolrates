import {
  AppBar,
  Box,
  Button,
  IconButton,
  makeStyles,
  Tab,
  Tabs,
  Theme,
  Toolbar
} from "@material-ui/core";
import classNames from "classnames";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { destroyCookie } from "nookies";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { apiRoutes } from "../../../consts/apiRoutes";
import { pageRoutes } from "../../../consts/pageRoutes";
import { urls } from "../../../consts/urls";
import useMeQuery from "../../../hooks/react-query/auth/useMeQuery";
import useSnackbarStore from "../../../hooks/stores/useSnackbarStore";
import myClientAxios from "../../../utils/axios/myClientAxios";
import Flex from "../../Shared/Flexboxes/Flex";
import FlexVCenter from "../../Shared/Flexboxes/FlexVCenter";
import NextImage from "../../Shared/Next/NextImage/NextImage";
import NextLink from "../../Shared/Next/NextLink/NextLink";
import AuthDialog from "./AuthDialog/AuthDialog";
import SidebarToggleButton from "./SidebarToggleButton";

// PE 2/3
const Navbar = () => {
  const classes = useStyles();

  const { data: authUser, isLoading } = useMeQuery({
    refetchOnWindowFocus: false,
    retry: false,
  });

  const [openAuthDialog, setOpenAuthDialog] = useState(false);

  const { pathname } = useRouter();
  const [tabIndex, setTabIndex] = useState<number | boolean>(false);

  const { setSuccessMessage } = useSnackbarStore();

  useEffect(() => {
    if (pathname.startsWith(pageRoutes.draft)) {
      setTabIndex(1);
    } else setTabIndex(0);
  }, [pathname]);

  const queryClient = useQueryClient();
  const logout = () => {
    // put this into an utils?...
    destroyCookie(null, "user");
    delete myClientAxios.defaults.headers["x-auth-token"];
    queryClient.setQueryData(apiRoutes.auth.me, null);
    setSuccessMessage("Successful logout!");
  };

  const isLoggedOut = !authUser && !isLoading;

  return (
    <AppBar className={classes.root} position="fixed" elevation={0}>
      <Toolbar className={classes.toolbar}>
        <FlexVCenter justifyContent="space-between" width="100%">
          <FlexVCenter>
            <SidebarToggleButton />

            <Box ml={2} />
            <NextLink href={urls.pages.index}>
              <a>
                <IconButton style={{ width: 24, height: 24 }}>
                  <NextImage
                    src={urls.image("fire-icon-league.png")}
                    width="16px"
                    height="20px"
                  />
                </IconButton>
              </a>
            </NextLink>
          </FlexVCenter>

          {authUser && (
            <Flex>
              <Tabs
                className={classes.tabs}
                value={tabIndex}
                indicatorColor="primary"
                textColor="primary"
              >
                <Link href={pageRoutes.index} passHref>
                  {/* PE 1/3 - DRY */}
                  <Tab
                    id="home-tab"
                    className={classNames(classes.tab, {
                      [`${classes.selectedTab}`]: tabIndex === 0,
                    })}
                    label={`Home`}
                  />
                </Link>
                <Link href={pageRoutes.draft} passHref>
                  <Tab
                    id="draft-tab"
                    label={`Draft`}
                    className={classNames(classes.tab, {
                      [`${classes.selectedTab}`]: tabIndex === 1,
                    })}
                  />
                </Link>
              </Tabs>
            </Flex>
          )}

          <FlexVCenter>
            {isLoading && "Loading..."}
            {isLoggedOut && (
              <Button onClick={() => setOpenAuthDialog(true)}>Login</Button>
            )}
            {authUser && <Button onClick={logout}>Logout</Button>}

            <AuthDialog
              open={openAuthDialog}
              onClose={() => setOpenAuthDialog(false)}
            />
          </FlexVCenter>
        </FlexVCenter>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    background: "#202020",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    zIndex: 1201,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  fireIcon: {
    color: theme.palette.secondary.main,
    height: "24px !important",
    width: "18px !important",
  },

  tabs: {
    // minHeight: 32,
    position: "relative",
    top: 5,
    zIndex: 1202,
  },
  tab: {
    fontSize: 16,
    paddingBottom: 16,
    minWidth: "inherit",
    width: "inherit",
    color: "white",
    opacity: 1,
  },
  selectedTab: {
    color: theme.palette.primary.main,
  },
}));

export default Navbar;
