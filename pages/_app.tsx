import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppProps } from 'next/dist/shared/lib/router/router';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import myTheme from '../src/consts/myTheme';
import { Hydrate } from 'react-query/hydration'
import { myQueryClient } from '../src/consts/myQueryClient';

export default function MyApp({ Component, pageProps }: AppProps) {

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
    }, []);

    // const queryClient = new QueryClient()

    // const [queryClient] = React.useState(() => new QueryClient())

    return (
        <React.Fragment>

            <QueryClientProvider client={myQueryClient}>
                <ThemeProvider theme={myTheme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />

                    {/* <Hydrate state={pageProps.dehydratedState}> */}

                    <Component {...pageProps} />
                    {/* </Hydrate> */}
                </ThemeProvider>
            </QueryClientProvider>

        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};