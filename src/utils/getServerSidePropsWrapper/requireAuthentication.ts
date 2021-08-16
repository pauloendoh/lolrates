import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "node:querystring";
import { parseCookies } from "nookies";
import { AuthUserGetDto } from "../../types/dtos/auth/AuthUserGetDto";

export function requireAuthentication(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext<ParsedUrlQuery>) => {
    
    const cookies = parseCookies(ctx)  // Add logic to extract token from `req.headers.cookie`
    const authUser = JSON.parse(cookies.user) as AuthUserGetDto

    if (!authUser) {
      // Redirect to index page
      return {
        redirect: {
          destination: '/',
          statusCode: 302
        }
      };
    }

    return await gssp(ctx); // Continue on to call `getServerSideProps` logic
  }
}