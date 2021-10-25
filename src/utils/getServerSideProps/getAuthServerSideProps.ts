import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export const getAuthServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  const userStr = cookies.user;

  if (!userStr) {
    // 2/3
    // redirect to winrates page
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
