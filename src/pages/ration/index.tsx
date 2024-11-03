import MainLayout from "@/components/_common/_layout/MainLayout";
import Page from "@/components/_common/_layout/Navbar/Page/Page";
import RationPage from "@/components/ration/RationPage/RationPage";
import { getAuthServerSideProps } from "@/utils/getServerSideProps/getAuthServerSideProps";
import Head from "next/head";

export const getServerSideProps = getAuthServerSideProps;

const RationPageRoute = () => {
  return (
    <MainLayout>
      <Head>
        <title>Ration</title>
      </Head>

      <Page type="auth">
        <RationPage />
      </Page>
    </MainLayout>
  );
};

export default RationPageRoute;
