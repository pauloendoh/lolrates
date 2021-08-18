import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { AppProps } from "next/app";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate } from "react-query/hydration";
import theme from "../src/consts/theme";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  // https://react-query.tanstack.com/guides/ssr
  const [queryClient] = React.useState(() => new QueryClient({defaultOptions: {queries:{staleTime: 1}}}));


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
