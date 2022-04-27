import { Box, Button, makeStyles, Theme, Toolbar } from "@material-ui/core";
import { destroyCookie } from "nookies";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import useMeQuery from "../../../../hooks/react-query/domain/auth/useMeQuery";
import useSnackbarStore from "../../../../hooks/zustand-stores/useSnackbarStore";
import { apiUrls } from "../../../../utils/apiUrls";
import myClientAxios from "../../../../utils/axios/myClientAxios";
import { urls } from "../../../../utils/urls";
import NextImage from "../../next-overrides/NextImage/NextImage";
import NextLink from "../../next-overrides/NextLink/NextLink";
import AuthDialog from "./AuthDialog/AuthDialog";
import S from "./Navbar.styles";
import NavbarAuthTabs from "./NavbarAuthTabs/NavbarAuthTabs";
import SidebarToggleButton from "./SidebarToggleButton/SidebarToggleButton";

// PE 2/3
const Navbar = () => {
  const classes = useStyles();

  const { data: authUser, isLoading } = useMeQuery();
  const [openAuthDialog, setOpenAuthDialog] = useState(false);

  const { setSuccessMessage } = useSnackbarStore();

  const queryClient = useQueryClient();
  const logout = () => {
    // put this into an utils?...
    destroyCookie(null, "user");
    delete myClientAxios.defaults.headers["x-auth-token"];
    queryClient.setQueryData(apiUrls.auth.me, null);
    setSuccessMessage("Successful logout!");
  };

  const isLoggedOut = !authUser && !isLoading;

  return (
    <S.AppBar position="fixed" elevation={0}>
      <Toolbar
        style={{
          justifyContent: "space-between",
        }}
      >
        <S.LeftIcons>
          <SidebarToggleButton />

          <Box ml={2} />
          <NextLink href={urls.pages.index}>
            <a>
              <NextImage
                src={urls.image("fire-icon-league.png")}
                width="16px"
                height="20px"
              />
            </a>
          </NextLink>
        </S.LeftIcons>

        {authUser && <NavbarAuthTabs />}

        <S.RightIcons>
          {isLoading && "Loading..."}
          {isLoggedOut && (
            <Button onClick={() => setOpenAuthDialog(true)}>Login</Button>
          )}
          {authUser && <Button onClick={logout}>Logout</Button>}

          <AuthDialog
            open={openAuthDialog}
            onClose={() => setOpenAuthDialog(false)}
          />
        </S.RightIcons>
      </Toolbar>
    </S.AppBar>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    background: "#202020",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    zIndex: 1201,
  },

  fireIcon: {
    color: theme.palette.secondary.main,
    height: "24px !important",
    width: "18px !important",
  },
}));

export default Navbar;
