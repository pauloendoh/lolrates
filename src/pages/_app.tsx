import { GlobalDialogs } from "@/components/_common/_dialogs/GlobalDialogs/GlobalDialogs";
import { GAnalyticsScript } from "@/utils/google-analytics/GAnalyticsScript";
import * as gtag from "@/utils/google-analytics/gtag";
import myApolloClient from "@/utils/graphql/myApolloClient";
import { ApolloProvider } from "@apollo/client";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate } from "react-query/hydration";
import { IoProvider } from "socket.io-react-hook";
import { ThemeProvider } from "styled-components";
import theme from "../utils/theme";
import "./styles.css";

export default function MyApp(props: AppProps<{ dehydratedState: unknown }>) {
  const { Component, pageProps } = props;

  const router = useRouter();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // https://react-query.tanstack.com/guides/ssr
  const [queryClient] = React.useState(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 1 } } })
  );

  return (
    <MuiThemeProvider theme={theme}>
      <GAnalyticsScript />

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={myApolloClient}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <ReactQueryDevtools initialIsOpen={false} />
              <DndProvider backend={HTML5Backend}>
                <IoProvider>
                  <Component {...pageProps} />
                  <GlobalDialogs />
                </IoProvider>
              </DndProvider>
            </Hydrate>
          </QueryClientProvider>
        </ApolloProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}
