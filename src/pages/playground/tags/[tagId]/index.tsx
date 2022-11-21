import myServerAxios from "@/utils/axios/myServerAxios";
import { urls } from "@/utils/urls";
import type { GetStaticPaths, GetStaticProps } from "next";

function TagIdPage({ tag }) {
  return <div>{tag.name}</div>;
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps: GetStaticProps = async (ctx) => {
  const res = await myServerAxios(ctx).get(urls.api.publicTags);
  const tags = await res.data;

  return {
    props: {
      tag: tags.find((tag) => tag.id === Number(ctx.params.tagId)),
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const res = await myServerAxios(ctx).get(urls.api.publicTags);
  const tags = await res.data;

  // Get the paths we want to pre-render based on posts
  const paths = tags.map((tag) => ({
    params: { tagId: String(tag.id) },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
};

export default TagIdPage;
