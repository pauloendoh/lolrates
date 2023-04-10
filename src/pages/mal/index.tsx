import MalPage from "@/components/mal-page/MalPage/MalPage";
import { getAuthServerSideProps } from "@/utils/getServerSideProps/getAuthServerSideProps";
import Head from "next/head";
import MainLayout from "../../components/_common/_layout/MainLayout";

export const getServerSideProps = getAuthServerSideProps;

const DraftPageRoute = () => {
  return (
    <MainLayout>
      <Head>
        <title>Mal</title>
      </Head>

      <MalPage />
    </MainLayout>
  );
};

export default DraftPageRoute;
