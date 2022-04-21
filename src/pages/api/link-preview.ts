import got from "got";
import createMetascraper from "metascraper";
import metascraperDescription from "metascraper-description";
import metascraperImage from "metascraper-image";
import metascraperTitle from "metascraper-title";
import type { NextApiRequest, NextApiResponse } from "next";

const metascraper = createMetascraper([
  metascraperDescription(),
  metascraperImage(),
  metascraperTitle(),
]);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query as { url: string };

  const { body: html, url } = await got(query.url);

  const metadata = await metascraper({ html, url });

  res.status(200).json(metadata);
};
