import AramUtilsPage from "@/components/aram-helper/AramHelperPage/AramHelperPage";
import { getAuthServerSideProps } from "@/utils/getServerSideProps/getAuthServerSideProps";
import Head from "next/head";
import MainLayout from "../../components/_common/_layout/MainLayout";

export const getServerSideProps = getAuthServerSideProps;

const DraftPageRoute = () => {
  return (
    <MainLayout>
      <Head>
        <title>Draft</title>
      </Head>

      <AramUtilsPage />
    </MainLayout>
  );
};

export default DraftPageRoute;
